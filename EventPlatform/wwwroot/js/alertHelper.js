

const PRIMARY_COLOR = '#e91e63'; 
const CANCEL_COLOR = '#6c757d';

export const SwalAlert = {
    success: (message) => {
        return Swal.fire({
            title: 'Thành công!',
            text: message,
            icon: 'success',
            confirmButtonColor: PRIMARY_COLOR,
            confirmButtonText: 'Tuyệt vời'
        });
    },

    // 2. Thông báo lỗi (Dùng khi API trả về 400/500)
    error: (message) => {
        return Swal.fire({
            title: 'Có lỗi xảy ra',
            text: message || 'Hệ thống đang bận, vui lòng thử lại.',
            icon: 'error',
            confirmButtonColor: PRIMARY_COLOR
        });
    },

    // 3. Xác nhận hành động (Quan trọng cho Delete/Cancel)
    confirm: (title, text, confirmText = 'Vâng, thực hiện!') => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: PRIMARY_COLOR,
            cancelButtonColor: CANCEL_COLOR,
            confirmButtonText: confirmText,
            cancelButtonText: 'Hủy bỏ'
        });
    },

    // 4. Loading (Quan trọng khi chờ .NET API xử lý)
    showLoading: (title = 'Đang xử lý...') => {
        Swal.fire({
            title: title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    },

    // 5. Tắt loading thủ công
    close: () => {
        Swal.close();
    },

    // 6. Toast (Góc phải)
    toast: (icon, title) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({ icon: icon, title: title });
    }
};