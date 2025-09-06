import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ja' | 'vi';
  setLanguage: (lang: 'ja' | 'vi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ja: {
    // Navigation
    home: 'ホーム',
    dashboard: 'ダッシュボード',
    community: 'コミュニティ',
    goals: '目標',
    profile: 'プロフィール',
    
    // Authentication
    login: 'ログイン',
    register: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    name: '名前',
    
    // Dashboard
    calories: 'カロリー',
    protein: 'タンパク質',
    carbs: '炭水化物',
    fat: '脂質',
    breakfast: '朝食',
    lunch: '昼食',
    dinner: '夜食',
    
    // Profile
    age: '年齢',
    height: '身長',
    weight: '体重',
    waist: 'ウエスト',
    neck: '首',
    hip: 'ヒップ',
    
    // Common
    save: '保存',
    cancel: 'キャンセル',
    add: '追加',
    edit: '編集',
    delete: '削除',
    loading: '読み込み中...',
    search: '検索',
    filter: 'フィルター',
    today: '今日',
    yesterday: '昨日',
    tomorrow: '明日'
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    dashboard: 'Bảng điều khiển',
    community: 'Cộng đồng',
    goals: 'Mục tiêu',
    profile: 'Hồ sơ',
    
    // Authentication
    login: 'Đăng nhập',
    register: 'Đăng ký',
    email: 'Email',
    password: 'Mật khẩu',
    name: 'Tên',
    
    // Dashboard
    calories: 'Calo',
    protein: 'Protein',
    carbs: 'Carb',
    fat: 'Chất béo',
    breakfast: 'Bữa sáng',
    lunch: 'Bữa trưa',
    dinner: 'Bữa tối',
    
    // Profile
    age: 'Tuổi',
    height: 'Chiều cao',
    weight: 'Cân nặng',
    waist: 'Vòng eo',
    neck: 'Vòng cổ',
    hip: 'Vòng hông',
    
    // Common
    save: 'Lưu',
    cancel: 'Hủy',
    add: 'Thêm',
    edit: 'Sửa',
    delete: 'Xóa',
    loading: 'Đang tải...',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    today: 'Hôm nay',
    yesterday: 'Hôm qua',
    tomorrow: 'Ngày mai'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<'ja' | 'vi'>('ja');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('gymexcel_language') as 'ja' | 'vi';
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: 'ja' | 'vi') => {
    setLanguageState(lang);
    localStorage.setItem('gymexcel_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ja']] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};