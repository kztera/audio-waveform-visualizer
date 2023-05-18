<h1>3D Audio Waveform Visualizer with JavaScript + Three.js</h1>

<h2>Table of Content</h2>

- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## 1. Ý tưởng

Với mục tiêu là tạo ra sóng nhảy theo nhạc, ý tưởng ban đầu chính là sử dụng dữ liệu tần số âm thanh sử dụng làm tham số truyền vào `uniforms` trong shader, từ đó tạo ra hiệu ứng sóng âm dựa trên `amplitude` của các tần số âm thanh.

Trong khi việc lấy dữ liệu tần số âm thanh được thực hiện khá đơn giản bằng cách sử dụng `Web Audio API` với `AudioContext` và `AnalyserNode` nhưng việc tạo ra hiệu ứng sóng âm thì lại có phần khó khăn hơn.

Về khái niệm `uniforms` trong `shader`, chúng ta có thể hiểu đơn giản là các đại diện cho dữ liệu có thể thay đổi trong quá trình chạy shader ví dụ như thời gian, màu sắc, biên độ và các thông số khác. Khi thay đổi những giá trị này với dữ liệu từ âm thanh lấy được ở trên, chúng ta có thể tạo ra hiệu ứng sóng âm.
First, run the development server:

## 2. Giải thích bước làm

### 2.1. Tạo project

Cho dù rằng trong Docs của ThreeJS có hướng dẫn cách thiết lập khi tạo mới 1 Dự án với HMTL, CSS và JS nhưng trong bài này chúng ta sẽ thiếp lập ThreeJS với Vite và Next.js cùng Tailwind CSS giúp hỗ trợ tạo ra những mô hình 3D thú vị và phức tạp hơn mà chỉ JS và CSS không thể làm được.

```bash
npx create-next-app@latest
```

Sau đó bạn sẽ được yêu cầu nhập tên dự án và một số thông tin khác. Sau khi tạo xong bạn sẽ được nhận 1 dự án NextJS ví dụ hoàn chỉnh.

### 2.2. Cài đặt Thư viện

Các thư viện cần dùng bạn có thể xem trong file `package.json`. Sử dụng `npm` để cài đặt chúng

```bash
npm install three dat.gui
```

### 2.3. Tạo đối tượng 3D có hình dạng bất kì

Đối tượng sóng nhạc có hình dạng như thế nào sẽ được quyết định ở bước này.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

```

```

```
