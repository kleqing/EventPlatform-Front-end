document.addEventListener('DOMContentLoaded', function () {

    // --- Logic cho Modal (Popup) ---
    // Gán sự kiện chung, vì modal có thể được tải bằng partial view hoặc nhúng trực tiếp
    document.body.addEventListener('click', function (e) {

        // Mở Modal
        // Tìm button có class 'open-speaker-modal-btn'
        const openBtn = e.target.closest('.open-speaker-modal-btn');
        if (openBtn) {
            const modal = document.getElementById('speakerDetailModal');
            if (modal) {
                // TODO: Lấy data thật từ button hoặc row
                // Ví dụ:
                // const row = openBtn.closest('tr');
                // const name = row.querySelector('.user-cell strong').textContent;
                // document.getElementById('modalSpeakerName').textContent = name;

                modal.style.display = 'flex';
            }
        }

        // Đóng Modal (cho cả 2 nút 'x' và 'Close')
        const closeBtn = e.target.closest('#closeModalBtn') || e.target.closest('#modalCloseBtn');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal-overlay');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    });

    // Đóng khi click ra ngoài
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Chỉ đóng khi click trực tiếp vào nền mờ (overlay)
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

});