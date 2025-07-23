<?php
session_start();
// Kiểm tra đăng nhập
if (isset($_SESSION['logged_in']) || $_SESSION['logged_in'] == true) {
    header("Location: ./src/page/dashboard.php");
    exit(); 
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ジムエクセル - 身体を高め、卓越性を解き放つ</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- ナビゲーション -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <span class="logo-elite">Gym</span><span class="logo-gym">Xcel</span>
            </div>
            
            <div class="nav-menu" id="nav-menu">
                <a href="./index.php" class="nav-link active">ホーム</a>
                <a href="./src/plan/plan.html" class="nav-link">会員プラン</a>
                <a href="./src/class-maneger/class-maneger.html" class="nav-link">クラス</a>
                <a href="#personal-trainers" class="nav-link">パーソナルトレーナー</a>
                <a href="./src/blog/blog-port.html" class="nav-link">ブログ</a>
                <a href="#contact" class="nav-link">お問い合わせ</a>
            </div>
            
            <div class="nav-actions">
                <button class="login-btn" onclick="window.location.href='./src/page/login.php'">
                    <i class="fas fa-user"></i>
                    <span>ログイン/登録</span>
                </button>
                <div class="mobile-menu-toggle" id="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>

    <!-- ヒーローセクション -->
    <section class="hero" id="home">
        <div class="hero-background">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="hero-line">あなたの</span>
                <span class="hero-highlight">身体を高める</span>
                <span class="hero-subtitle">卓越性を解き放つ</span>
            </h1>
            <p class="hero-description">
                世界クラスの施設、専門トレーナー、プレミアム設備で身体と心を変革しましょう。
            </p>
            <div class="hero-actions">
                <button class="btn-primary">
                    <span>今すぐ参加</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-play"></i>
                    <span>ツアーを見る</span>
                </button>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-mouse">
                <div class="scroll-dot"></div>
            </div>
        </div>
    </section>

    <!-- 登録セクション -->
    <section class="registration" id="registration">
        <div class="container">
            <div class="registration-grid">
                <div class="registration-content">
                    <h2 class="section-title">
                        あなたの
                        <span class="title-highlight">変革を始める</span>
                    </h2>
                    <p class="section-description">
                        プレミアム施設と専門家の指導で人生を変えた何千人もの会員に加わりましょう。
                    </p>
                    <div class="benefits-list">
                        <div class="benefit-item">
                            <div class="benefit-check">✓</div>
                            <span>すべてのプレミアム設備へのアクセス</span>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-check">✓</div>
                            <span>パーソナルトレーナー相談</span>
                        </div>
                        <div class="benefit-item">
                            <div class="benefit-check">✓</div>
                            <span>無制限のグループクラス</span>
                        </div>
                    </div>
                </div>
                
                <div class="registration-form-container">
                    <h3 class="form-title">無料トライアルを取得</h3>
                    <form class="registration-form" id="registration-form">
                        <div class="form-group">
                            <i class="fas fa-user form-icon"></i>
                            <input type="text" name="fullName" placeholder="フルネーム" required>
                        </div>
                        <div class="form-group">
                            <i class="fas fa-phone form-icon"></i>
                            <input type="tel" name="phone" placeholder="電話番号" required>
                        </div>
                        <div class="form-group">
                            <i class="fas fa-envelope form-icon"></i>
                            <input type="email" name="email" placeholder="メールアドレス" required>
                        </div>
                        <div class="form-group">
                            <i class="fas fa-credit-card form-icon"></i>
                            <select name="membershipPlan" required>
                                <option value="">会員プランを選択</option>
                                <option value="basic-monthly">ベーシック月額</option>
                                <option value="premium-monthly">プレミアム月額</option>
                                <option value="elite-monthly">エリート月額</option>
                                <option value="annual-premium">年間プレミアム</option>
                                <option value="elite-annual">エリート年間</option>
                            </select>
                        </div>
                        <button type="submit" class="form-submit-btn">
                            1週間無料トライアルを取得
                        </button>
                    </form>
                    <p class="form-disclaimer">
                        契約の義務はありません。いつでもキャンセル可能。
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ブログセクション -->
    <section class="blog" id="blog">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    フィットネス
                    <span class="title-highlight">知識</span>
                </h2>
                <p class="section-description">
                    専門家チームからの最新のフィットネスヒント、栄養アドバイス、トレーニング技術を入手しましょう。
                </p>
            </div>
            
            <div class="blog-grid">
                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="筋肉をつける">
                        <div class="blog-category">筋力トレーニング</div>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">筋肉をつけるための10の必須エクササイズ</h3>
                        <p class="blog-excerpt">あなたの体格を変え、筋力の増加を最大化する基本的な動きを発見しましょう。</p>
                        <div class="blog-meta">
                            <div class="blog-author">
                                <i class="fas fa-user"></i>
                                <span>マイク・ジョンソン</span>
                            </div>
                            <div class="blog-time">
                                <i class="fas fa-clock"></i>
                                <span>5分で読める</span>
                            </div>
                        </div>
                        <a href="#" class="blog-link">
                            <span>続きを読む</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="栄養ガイド">
                        <div class="blog-category">栄養</div>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">最適なパフォーマンスのための栄養ガイド</h3>
                        <p class="blog-excerpt">包括的な栄養戦略で最大の結果を得るために体に燃料を供給する方法を学びましょう。</p>
                        <div class="blog-meta">
                            <div class="blog-author">
                                <i class="fas fa-user"></i>
                                <span>サラ・チェン</span>
                            </div>
                            <div class="blog-time">
                                <i class="fas fa-clock"></i>
                                <span>7分で読める</span>
                            </div>
                        </div>
                        <a href="#" class="blog-link">
                            <span>続きを読む</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="回復技術">
                        <div class="blog-category">回復</div>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">アスリートのための回復技術</h3>
                        <p class="blog-excerpt">あなたの進歩を加速させる実証済みの技術で回復の技術をマスターしましょう。</p>
                        <div class="blog-meta">
                            <div class="blog-author">
                                <i class="fas fa-user"></i>
                                <span>デビッド・スミス</span>
                            </div>
                            <div class="blog-time">
                                <i class="fas fa-clock"></i>
                                <span>6分で読める</span>
                            </div>
                        </div>
                        <a href="#" class="blog-link">
                            <span>続きを読む</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" alt="メンタル強さ">
                        <div class="blog-category">マインドセット</div>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">フィットネスにおけるメンタル強さ</h3>
                        <p class="blog-excerpt">チャンピオンのマインドセットを開発し、目標を達成するために精神的障壁を克服しましょう。</p>
                        <div class="blog-meta">
                            <div class="blog-author">
                                <i class="fas fa-user"></i>
                                <span>リサ・パーカー</span>
                            </div>
                            <div class="blog-time">
                                <i class="fas fa-clock"></i>
                                <span>4分で読める</span>
                            </div>
                        </div>
                        <a href="#" class="blog-link">
                            <span>続きを読む</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
            
            <div class="blog-cta">
                <button class="btn-dark">
                    <span>すべての記事を見る</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </section>

    <!-- オファーセクション -->
    <section class="offers" id="offers">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    特別
                    <span class="title-highlight">オファー</span>
                </h2>
                <p class="section-description">
                    フィットネスの旅を始めるのに役立つ独占的なお得な情報をお見逃しなく。
                </p>
            </div>
            
            <div class="offers-carousel">
                <div class="carousel-container">
                    <div class="carousel-track" id="carousel-track">
                        <div class="offer-slide active">
                            <div class="offer-content">
                                <div class="offer-badge">
                                    <i class="fas fa-percent"></i>
                                    <span>50% OFF</span>
                                </div>
                                <h3 class="offer-title">新規会員スペシャル</h3>
                                <p class="offer-description">今参加すると、最初の1ヶ月が50%オフ、さらに無料のパーソナルトレーニングセッションが付きます</p>
                                <div class="offer-actions">
                                    <button class="btn-primary">オファーを請求</button>
                                    <div class="offer-validity">
                                        <i class="fas fa-star"></i>
                                        <span>有効期限: 限定時間</span>
                                    </div>
                                </div>
                            </div>
                            <div class="offer-image">
                                <img src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="新規会員スペシャル">
                            </div>
                        </div>

                        <div class="offer-slide">
                            <div class="offer-content">
                                <div class="offer-badge">
                                    <i class="fas fa-percent"></i>
                                    <span>25% OFF</span>
                                </div>
                                <h3 class="offer-title">学生割引</h3>
                                <p class="offer-description">有効な学生証提示で全ての会員プランが25%オフ</p>
                                <div class="offer-actions">
                                    <button class="btn-primary">割引を取得</button>
                                    <div class="offer-validity">
                                        <i class="fas fa-star"></i>
                                        <span>有効期限: 学年度</span>
                                    </div>
                                </div>
                            </div>
                            <div class="offer-image">
                                <img src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="学生割引">
                            </div>
                        </div>

                        <div class="offer-slide">
                            <div class="offer-content">
                                <div class="offer-badge">
                                    <i class="fas fa-users"></i>
                                    <span>グループ料金</span>
                                </div>
                                <h3 class="offer-title">企業向けウェルネス</h3>
                                <p class="offer-description">チームをご招待ください！従業員1人あたりわずか$299から始まる法人会員</p>
                                <div class="offer-actions">
                                    <button class="btn-primary">詳細を見る</button>
                                    <div class="offer-validity">
                                        <i class="fas fa-star"></i>
                                        <span>有効期限: 継続中</span>
                                    </div>
                                </div>
                            </div>
                            <div class="offer-image">
                                <img src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" alt="企業向けウェルネス">
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-btn carousel-prev" id="carousel-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-btn carousel-next" id="carousel-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="carousel-dots">
                    <button class="dot active" data-slide="0"></button>
                    <button class="dot" data-slide="1"></button>
                    <button class="dot" data-slide="2"></button>
                </div>
            </div>
        </div>
    </section>

    <!-- お客様の声セクション -->
    <section class="testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    会員の
                    <span class="title-highlight">成功ストーリー</span>
                </h2>
                <p class="section-description">
                    私たちと共にフィットネスの旅を高めることを選んだ実際の人々からの実際の変革。
                </p>
            </div>
            
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-quote">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-content">
                        「ジムエクセルは私のフィットネスへのアプローチを完全に変えました。トレーナーは素晴らしく、施設は世界クラスです。これまで以上に強く、自信を持てるようになりました。」
                    </p>
                    <div class="testimonial-result">
                        4ヶ月で25ポンド減量
                    </div>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="ジェニファー・マルティネス">
                        <div class="author-info">
                            <h4>ジェニファー・マルティネス</h4>
                            <p>マーケティングエグゼクティブ</p>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card">
                    <div class="testimonial-quote">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-content">
                        「個別のトレーニングプログラムと最先端の設備がすべての違いを生みます。ジムエクセルは単なるジムではなく、ライフスタイルのアップグレードです。」
                    </p>
                    <div class="testimonial-result">
                        筋肉15ポンド増加
                    </div>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="マイケル・チェン">
                        <div class="author-info">
                            <h4>マイケル・チェン</h4>
                            <p>ソフトウェアエンジニア</p>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card">
                    <div class="testimonial-quote">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-content">
                        「忙しい起業家として、最小限の時間で最大の結果を出すジムが必要でした。ジムエクセルの効率的なプログラムと専門家の指導がまさにそれを提供してくれます。」
                    </p>
                    <div class="testimonial-result">
                        総合フィットネス40%向上
                    </div>
                    <div class="testimonial-author">
                        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" alt="サラ・ジョンソン">
                        <div class="author-info">
                            <h4>サラ・ジョンソン</h4>
                            <p>ビジネスオーナー</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="testimonials-cta">
                <p class="cta-text">あなた自身の成功ストーリーを書き始める準備はできましたか？</p>
                <button class="btn-primary">あなたの変革を始める</button>
            </div>
        </div>
    </section>

    <!-- フッター -->
    <footer class="footer" id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <span class="logo-elite">ジム</span><span class="logo-gym">エクセル</span>
                    </div>
                    <p class="footer-description">
                        世界クラスの施設、専門トレーナー、プレミアム設備で身体と心を変革しましょう。
                    </p>
                    <div class="footer-contact">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>フィットネスストリート123, エリート地区, 東京 100-0001</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>(03) 1234-5678</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>info@gymexcel.jp</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h3>クイックリンク</h3>
                    <ul>
                        <li><a href="#membership-plans">会員プラン</a></li>
                        <li><a href="#personal-training">パーソナルトレーニング</a></li>
                        <li><a href="#classes">グループクラス</a></li>
                        <li><a href="#nutrition">栄養指導</a></li>
                        <li><a href="#corporate">企業向けウェルネス</a></li>
                        <li><a href="#student">学生割引</a></li>
                    </ul>
                </div>
                
                <div class="footer-support">
                    <h3>サポート</h3>
                    <ul>
                        <li><a href="#faq">よくある質問</a></li>
                        <li><a href="#support">サポートに連絡</a></li>
                        <li><a href="#portal">会員ポータル</a></li>
                        <li><a href="#schedule">クラススケジュール</a></li>
                        <li><a href="#tours">施設ツアー</a></li>
                        <li><a href="#safety">安全ガイドライン</a></li>
                    </ul>
                </div>
                
                <div class="footer-hours">
                    <h3>営業時間 & ソーシャル</h3>
                    <div class="hours-info">
                        <div class="hours-header">
                            <i class="fas fa-clock"></i>
                            <span>営業時間</span>
                        </div>
                        <div class="hours-list">
                            <div class="hours-item">
                                <span>月～金:</span>
                                <span>5:00 - 23:00</span>
                            </div>
                            <div class="hours-item">
                                <span>土曜日:</span>
                                <span>6:00 - 22:00</span>
                            </div>
                            <div class="hours-item">
                                <span>日曜日:</span>
                                <span>7:00 - 21:00</span>
                            </div>
                        </div>
                    </div>
                    <div class="social-links">
                        <h4>フォローする</h4>
                        <div class="social-icons">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-map">
                <h3>所在地</h3>
                <div class="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683715!2d139.7432442152582!3d35.65858048019963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2sTokyo%20Tower!5e0!3m2!1sen!2sjp!4v1635959000000!5m2!1sen!2sjp"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="ジムエクセル所在地">
                    </iframe>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-copyright">
                    <p>&copy; 2024 ジムエクセル. すべての権利を保有。</p>
                </div>
                <div class="footer-legal">
                    <a href="#privacy">プライバシーポリシー</a>
                    <a href="#terms">利用規約</a>
                    <a href="#cookies">クッキーポリシー</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>