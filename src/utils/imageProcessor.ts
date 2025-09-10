/**
 * 图像处理工具类
 * 参考文档中的图像处理工具实现
 */

export class ImageProcessor {
  /**
   * 加载图像
   * @param src 图像源
   * @returns Promise<HTMLImageElement>
   */
  static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * 创建Canvas
   * @param width 宽度
   * @param height 高度
   * @returns Canvas元素和上下文
   */
  static createCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    return { canvas, ctx };
  }

  /**
   * 将黑白mask图转换为Alpha通道
   * 商品抠图返回的是黑白图，背景为黑色，需要转换为透明背景
   * @param maskImageSrc mask图像源
   * @returns Promise<HTMLCanvasElement>
   */
  static async convertMaskToAlpha(maskImageSrc: string): Promise<HTMLCanvasElement> {
    const maskImage = await this.loadImage(maskImageSrc);
    const { canvas, ctx } = this.createCanvas(maskImage.width, maskImage.height);
    
    // 绘制mask图像
    ctx.drawImage(maskImage, 0, 0);
    
    // 获取图像数据
    const imageData = ctx.getImageData(0, 0, maskImage.width, maskImage.height);
    const data = imageData.data;
    // 将黑白值转换为Alpha通道
    // 白色(255)变为不透明(255)，黑色(0)变为透明(0)
    // for (let i = 0; i < data.length; i += 4) {
    //   const gray = data[i]; // 取红色通道作为灰度值
      
    //   // 设置为白色，Alpha通道为灰度值
    //   data[i] = 255;     // R
    //   data[i + 1] = 255; // G
    //   data[i + 2] = 255; // B
    //   data[i + 3] = gray; // A - 使用灰度值作为透明度
    // }

      // 处理mask
      for (let i = 3; i < data.length; i += 4) {
        data[i] = data[i - 3];
    }

    // 将处理后的数据写回canvas
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * 将原图与mask融合，生成抠图结果
   * @param originalImageSrc 原图源
   * @param maskImageSrc mask图源
   * @returns Promise<HTMLCanvasElement>
   */
  static async fuseImageWithMask(
    originalImageSrc: string,
    maskImageSrc: string
  ): Promise<HTMLCanvasElement> {
    const [originalImage, maskCanvas] = await Promise.all([
      this.loadImage(originalImageSrc),
      this.convertMaskToAlpha(maskImageSrc)
    ]);

    const { canvas: resultCanvas, ctx: resultCtx } = this.createCanvas(
      originalImage.width,
      originalImage.height
    );

    // 绘制原图
    resultCtx.drawImage(originalImage, 0, 0);

    // 应用mask - 使用destination-in混合模式
    resultCtx.save();
    resultCtx.globalCompositeOperation = 'destination-in';
    
    // 将mask缩放到与原图相同尺寸
    resultCtx.drawImage(
      maskCanvas, 
      0, 0, maskCanvas.width, maskCanvas.height,
      0, 0, originalImage.width, originalImage.height
    );
    
    resultCtx.restore();

    return resultCanvas;
  }

  /**
   * 边缘裁剪 - 去除透明边缘
   * @param canvas 输入canvas
   * @returns 裁剪后的canvas
   */
  static cropToEdge(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bounds = this.getImageBounds(imageData);

    if (bounds) {
      const { canvas: croppedCanvas, ctx: croppedCtx } = this.createCanvas(
        bounds.width,
        bounds.height
      );
      
      croppedCtx.drawImage(
        canvas,
        bounds.x, bounds.y, bounds.width, bounds.height,
        0, 0, bounds.width, bounds.height
      );
      
      return croppedCanvas;
    }

    return canvas;
  }

  /**
   * 获取图像的有效边界
   * @param imageData 图像数据
   * @returns 边界信息
   */
  private static getImageBounds(imageData: ImageData): {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null {
    const { data, width, height } = imageData;
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let hasContent = false;

    // 扫描所有像素，找到非透明像素的边界
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 0) {
          hasContent = true;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    if (!hasContent) {
      return null;
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  }

  /**
   * Canvas转换为Blob
   * @param canvas Canvas元素
   * @param type 图像类型
   * @param quality 质量(0-1)
   * @returns Promise<Blob>
   */
  static canvasToBlob(
    canvas: HTMLCanvasElement, 
    type = 'image/png', 
    quality = 1
  ): Promise<Blob> {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), type, quality);
    });
  }

  /**
   * Canvas转换为DataURL
   * @param canvas Canvas元素
   * @param type 图像类型
   * @param quality 质量(0-1)
   * @returns DataURL字符串
   */
  static canvasToDataURL(
    canvas: HTMLCanvasElement, 
    type = 'image/png', 
    quality = 1
  ): string {
    return canvas.toDataURL(type, quality);
  }

  /**
   * Blob转换为DataURL
   * @param blob Blob对象
   * @returns Promise<string>
   */
  static blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
