const filterClass = document.getElementById('filter-class');
filterClass.addEventListener('change', () => {
    const selectedValue = filterClass.value;
    console.log('選択されたフィルター:', selectedValue);
    // ここにフィルタリングロジックを追加
});

// 新規クラス追加ボタン
const addClassBtn = document.getElementById('add-class-btn');
addClassBtn.addEventListener('click', () => {
    console.log('新規クラス追加ダイアログを表示');
    // ここにモーダル表示ロジックを追加
});

// Profile dropdown toggle
const memberProfile = document.getElementById('member-profile');
const profileDropdown = document.getElementById('profile-dropdown');

if (memberProfile && profileDropdown) {
    memberProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        memberProfile.classList.toggle('active');
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        memberProfile.classList.remove('active');
        profileDropdown.classList.remove('active');
    });
}