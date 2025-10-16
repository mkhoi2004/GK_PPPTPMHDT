document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('upload-form');
  const input = document.getElementById('image');
  const preview = document.getElementById('preview');
  const resultDiv = document.getElementById('result');
  const fileLabel = document.querySelector('.file-label');

  function hideResult() {
    resultDiv.textContent = '';
    resultDiv.className = 'result';
    resultDiv.style.display = 'none';
  }
  function showNoFileMsg() {
    resultDiv.textContent = 'Chưa chọn ảnh';
    resultDiv.className = 'result error';
    resultDiv.style.display = 'block';
  }

  // 1) Khi chọn ảnh mới: cập nhật preview + ẩn kết quả cũ
  input.addEventListener('change', () => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => { preview.src = e.target.result; };
      reader.readAsDataURL(input.files[0]);
      hideResult(); // Ẩn kết quả cũ
    } else {
      // Trường hợp một số trình duyệt bắn change khi cancel
      preview.removeAttribute('src');
      showNoFileMsg();
    }
  });

  // 2) Bắt trường hợp mở hộp thoại rồi Cancel (không bắn change trên vài trình duyệt)
  if (fileLabel) {
    fileLabel.addEventListener('click', () => {
      const onFocusBack = () => {
        // đợi 1 tick để browser cập nhật files
        setTimeout(() => {
          if (!input.files || input.files.length === 0) {
            preview.removeAttribute('src');
            showNoFileMsg();
          }
          window.removeEventListener('focus', onFocusBack);
        }, 0);
      };
      window.addEventListener('focus', onFocusBack, { once: true });
    });
  }

  // 3) Submit dự đoán
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Nếu chưa có file → báo lỗi ngay
    if (!input.files || input.files.length === 0) {
      showNoFileMsg();
      return;
    }

    const formData = new FormData(this);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        resultDiv.textContent = `Kết quả: ${data.prediction}`;
        resultDiv.className = 'result success';
      } else {
        resultDiv.textContent = `Lỗi: ${data.error}`;
        resultDiv.className = 'result error';
      }
      resultDiv.style.display = 'block';
    } catch (error) {
      resultDiv.textContent = 'Có lỗi khi dự đoán';
      resultDiv.className = 'result error';
      resultDiv.style.display = 'block';
      console.error('Error:', error);
    }
  });
});
