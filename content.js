(() => {
  function companyQuest(name, flavor) {
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: `${name}、入社一年目。現場の空気が、すぐ肌にくる。`,
        body: `${flavor}\n名刺の社名より先に、「今日何をするか」が会話になる。`,
        choices: [
          { label: "まずは目の前の仕事を確実にこなす", next: "steady" },
          { label: "周りの部署や店舗を見て回る", next: "look" }
        ]
      },
      steady: {
        kicker: "選択のあと",
        title: "できることが増えるほど、任せられる範囲も広がった。",
        body: `「${name}っぽさ」は、スローガンより日々の仕事の積み重ねで見えてくる。\n一方で、自分の適性も少しずつ輪郭を帯びてきた。`,
        choices: [
          { label: "現場のプロとして深掘りする", next: "end-craft" },
          { label: "新しい企画や改善に手を挙げる", next: "end-challenge" }
        ]
      },
      look: {
        kicker: "選択のあと",
        title: "同じグループでも、場所が違えば景色が違う。",
        body: "売場、倉庫、事務所、お客様対応。\n一つの会社の中に、いくつもの働き方が入っている。",
        choices: [
          { label: "お客様に近い仕事を選ぶ", next: "end-craft" },
          { label: "仕組みづくり側に関わってみる", next: "end-challenge" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: `${name}の現場で、「続く仕事」の感触が残った。`,
        body: "派手さより、毎日の積み重ねが自分を形づくる。\n気になるなら、次は本物の職場体験で温度を確かめてほしい。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-challenge": {
        ending: true,
        kicker: "この人生の感触",
        title: `${name}の中で、小さな改善を動かせた。`,
        body: "会社はひとつでも、挑戦の入口はいくつもある。\n「ここで試したい」が残るなら、現実の接点へ進もう。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "グループの他社も比べてみる", href: "#reality-work" }
        ]
      }
    };
  }

  // 大きなイベントは少なめ。間に「日常」を挟み、グループ会社を横断して絡める
  function homeMadeEventQuest() {
    return {
      start: {
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        kicker: "QUEST / 株式会社綿伴ホームメイド",
        title: "入社一年目。売場には、まだ知らない仕事がたくさんある。",
        body: "商品を並べる人、仕入れる人、届ける人。\n一つのお店の中で、いくつもの人生が動いている。",
        choices: [
          { label: "まずは売場の仕事を覚える", next: "ordinary-days" },
          { label: "休憩時間に、他部署の人と話す", next: "ordinary-days" }
        ]
      },
      "ordinary-days": {
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        speaker: "先輩・桐谷",
        img: "assets/char-manager.png",
        kicker: "いつもの一日",
        title: "特別なことは起きない。でも、毎日が少しずつ上手くなる。",
        body: "朝の陳列、お客様対応、夕方の棚直し。\n慣れてきた頃、店長が声をかけてきた。",
        choices: [
          { label: "話を聞く", next: "season-fest" }
        ]
      },
      "season-fest": {
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        speaker: "先輩・桐谷",
        img: "assets/char-manager.png",
        kicker: "季節の店頭",
        title: "炭の香りが店先に立つ日がある。チーム全員で場をつくる。",
        body: "予約の電話、焼き場の順番、包み方の確認。\n『去年よりうまく』は、気合より段取りで決まる。",
        choices: [
          { label: "焼き場のサポートに入る", next: "project-invite" },
          { label: "受付と案内を担当する", next: "project-invite" }
        ]
      },
      "project-invite": {
        event: {
          label: "WORK EVENT",
          icon: "✦",
          title: "共同企画への招待",
          text: "美原商店と、新しいお茶売場をつくるプロジェクトが始まる。"
        },
        speaker: "先輩・桐谷",
        img: "assets/char-manager.png",
        kicker: "仕事イベント",
        title: "「君も、この企画に入ってみない？」",
        body: "経験は足りない。でも、お客様に近い視点を期待されている。\n美原商店から来る担当者と、三か月かけて売場をつくる。",
        choices: [
          { label: "やってみます、と答える", next: "meet-hinata" },
          { label: "少し考えてから返事する", next: "meet-hinata" }
        ]
      },
      "meet-hinata": {
        speaker: "美原商店・陽菜",
        img: "assets/char-campus.png",
        kicker: "数日後",
        title: "休憩室で、美原商店の担当・陽菜と顔を合わせる。",
        body: "「このお店で、どんなお茶なら手に取ってもらえると思う？」\n仕事の相談から始まって、好きな食べ物の話まで広がった。",
        choices: [
          { label: "企画の話を続ける", next: "supply-run" },
          { label: "また今度、ゆっくり話そうと伝える", next: "supply-run" }
        ]
      },
      "supply-run": {
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "同じ日の午後",
        title: "売場の備品も、ホームメイドで揃えることになった。",
        body: "棚札、試飲カップ、案内ボード。\n「会社の備品って、意外とここにあるんだね」と陽菜が笑う。\nグループの店同士だと、必要なものがすぐ隣にある。",
        choices: [
          { label: "一緒にカートを押す", next: "planning-weeks" }
        ]
      },
      "planning-weeks": {
        kicker: "それから数週間",
        title: "打ち合わせ、試作、売場の図面。特別な日より、積み重ねの日々。",
        body: "うまくいく日もあれば、提案が通らない日もある。\nそれでも、陽菜と話す時間は少しずつ増えていった。",
        choices: [
          { label: "最初の提案会を迎える", next: "collaboration" }
        ]
      },
      collaboration: {
        speaker: "美原商店・陽菜",
        img: "assets/char-campus.png",
        kicker: "提案のあと",
        title: "最初の提案は通らなかった。でも、陽菜は笑っている。",
        body: "「失敗したから、次はもっと面白くできるね」\nその言葉で、もう一度やってみようと思えた。",
        choices: [
          { label: "二人で企画を練り直す", next: "quiet-months" },
          { label: "店全体を巻き込む案も考えてみる", next: "quiet-months" }
        ]
      },
      "quiet-months": {
        kicker: "季節がひとつ進む",
        title: "企画は軌道に乗り始めた。日常が、少しだけ華やいで見える。",
        body: "売場には新しいお茶が並び、お客様の反応も見えてきた。\nある休日の朝、陽菜から短いメッセージが届く。",
        choices: [
          { label: "メッセージを開く", next: "day-off" }
        ]
      },
      "day-off": {
        event: {
          label: "RELATIONSHIP EVENT",
          icon: "♡",
          title: "休日のお誘い",
          text: "陽菜から「今度、うちの喫茶でお茶しない？」と連絡が届いた。"
        },
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "関係イベント",
        title: "これは仕事の続き？ それとも、少し違う時間？",
        body: "美原商店の店。仕事で何度も通った場所が、休日の待ち合わせになる。",
        choices: [
          { label: "楽しみにしてる、と返す", next: "date-arrive" },
          { label: "企画が一段落してからにしよう、と返す", next: "date-arrive" }
        ]
      },
      "date-arrive": {
        bg: "assets/backgrounds/bg-tea-shop-exterior.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "休日・美原商店",
        title: "夕暮れの店先で、陽菜が手を振っている。",
        body: "仕事の名刺は今日はいらない。\nガラスの向こうから、甘い香りが少しだけ漏れてくる。",
        choices: [
          { label: "店に入る", next: "date-cafe" }
        ]
      },
      "date-cafe": {
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "喫茶席",
        title: "木の席に座ると、窓の外が少しゆっくり見える。",
        body: "「仕事の話、今日は半分までね」\n半分を過ぎた頃、未来の話が自然に混ざり始めた。",
        choices: [
          { label: "おすすめを頼む", next: "date-sweets" }
        ]
      },
      "date-sweets": {
        bg: "assets/backgrounds/bg-jonamashi.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "上生菓子とお茶",
        title: "季節の上生菓子が、白い皿の上で小さく季節を見せる。",
        body: "「これ、私が好きなやつ」\n仕事で扱っている商品が、今日はただの『好き』になる。",
        choices: [
          { label: "また来よう、と伝える", next: "one-year-later" }
        ]
      },
      "one-year-later": {
        speaker: "店長・桐谷",
        img: "assets/char-manager.png",
        kicker: "約一年後",
        title: "仕事も、人間関係も、以前より少し大人になっている。",
        body: "共同企画は形になり、店長からは次の役割の話も出た。\n陽菜とは、まだ同じ場所で働きながら、未来の話を続けている。",
        choices: [
          { label: "さらに時が進む", next: "two-years-later" }
        ]
      },
      "two-years-later": {
        event: {
          label: "LIFE EVENT",
          icon: "!",
          title: "二年後。結婚と転勤の話",
          text: "交際中の陽菜に、長野県で新店舗を立ち上げる話が来た。"
        },
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "人生の分岐点",
        title: "「一緒に長野へ来てほしい。でも、あなたの仕事も大切にしてほしい」",
        body: "結婚、仕事、移住。\nどれか一つではなく、いくつもの選択が同時に目の前へ来た。",
        choices: [
          { label: "結婚して、一緒に長野へ行く", next: "nest-house" },
          { label: "今の仕事を続け、遠距離を選ぶ", next: "end-distance" },
          { label: "まず自分のキャリアを優先する", next: "end-career" }
        ]
      },
      "nest-house": {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "新居づくり / 林郷の家",
        title: "二人の家を、木の骨組みから話し合う。",
        body: "グループの住宅会社・林郷の家で、間取りの図面がテーブルに広がる。\n「ここに朝日が入るといいね」——仕事の社名より、暮らしの言葉が増える。",
        choices: [
          { label: "家具の話へ進む", next: "nest-ligna" }
        ]
      },
      "nest-ligna": {
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "新居づくり / リグナチュラ",
        title: "リグナで、新居の家具を選ぶ。",
        body: "ソファ、テーブル、カーテン。\n家の形が決まると、次は部屋の景色を決める番だ。\n店員さんも『林郷の家の図面、持ってます』と当たり前のように聞いてくる。",
        choices: [
          { label: "収納の隙間が気になる", next: "nest-taiyo" }
        ]
      },
      "nest-taiyo": {
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        speaker: "陽菜",
        img: "assets/char-campus.png",
        kicker: "新居づくり / 太平洋",
        title: "家具のすき間にぴったりの収納を、大洋へ注文する。",
        body: "既製品では埋まらない寸法。\n工場の通路を通ると、木の板が家具へ変わっていく音がする。\nグループだから、図面の続きが別の会社でつながる。",
        choices: [
          { label: "暮らしが動き出す", next: "end-together" }
        ]
      },
      "end-together": {
        ending: true,
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "この人生の感触",
        title: "仕事から始まった出会いが、暮らす場所まで変えた。",
        body: "ホームメイド、美原商店、林郷の家、リグナ、大洋。\n別々の社名が、二人の一日の中で一本の線になった。",
        reality: [
          { label: "長野県での暮らしを試してみる", href: "#reality-town" },
          { label: "グループ会社の仕事体験を見る", href: "#reality-work" }
        ]
      },
      "end-distance": {
        ending: true,
        kicker: "この人生の感触",
        title: "離れて暮らしながら、二人の未来をつくることにした。",
        body: "すぐに同じ場所を選ばなくてもいい。\n仕事も関係も、話し合いながら更新していく人生がある。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
          { label: "二拠点生活について調べる", href: "#reality-town" }
        ]
      },
      "end-career": {
        ending: true,
        kicker: "この人生の感触",
        title: "今は、自分の仕事を選んだ。",
        body: "恋愛を選ばなかったわけではない。今の自分に必要な順番を選んだ。\n数年後、また違う答えになるかもしれない。",
        reality: [
          { label: "この仕事をもっと知る", href: "#reality-work" },
          { label: "別の人生も試してみる", href: "#reality-event" }
        ]
      }
    };
  }

  function solutionsLinkedQuest() {
    const name = "綿伴ソウリューションズ株式会社";
    const senior = "assets/char-work-uniform-site-man.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-solution-exterior.jpg",
        kicker: `QUEST / ${name}`,
        title: "入社一年目。現場の安全と納期が、毎日の会話の中心にある。",
        body: "建物や設備の『困った』を片づける仕事。\n図面の先に、使う人の一日が見えてくる。",
        choices: [
          { label: "まずは現場に出てみる", next: "warehouse" },
          { label: "先輩の出張に同行する", next: "trip" }
        ]
      },
      warehouse: {
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "木造倉庫の現場",
        title: "柱の香りがする倉庫で、寸法を確認する。",
        body: "林郷の家で使う木の話とも、意外と近い。\n『建てる』と『収める』は、グループの中で隣り合っている。",
        choices: [
          { label: "雪国の立駐現場へ行く", next: "snow" },
          { label: "沿岸の立駐現場へ行く", next: "resilient" }
        ]
      },
      snow: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "雪対策",
        title: "止めやすさの奥に、雪との戦いがある。",
        body: "融雪、防雪、足元の安全。\n『止められる』は、天候の設計でもある。",
        choices: [
          { label: "融雪の仕組みを確認する", next: "trip" },
          { label: "柱スパンの広さを体感する", next: "trip" }
        ]
      },
      resilient: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "備えの設計",
        title: "もしもの水を想定して、設備の置き場が決まっている。",
        body: "大切な盤を上の階へ。屋根には太陽光。\n使う人の安心が、図面の優先順位になる。",
        choices: [
          { label: "電気設備の配置を確認する", next: "trip" },
          { label: "屋根の発電パネルを見上げる", next: "trip" }
        ]
      },
      trip: {
        event: {
          label: "WORK EVENT",
          icon: "✈",
          title: "海外出張の同行",
          text: "部品調達の打ち合わせのため、初めての海外出張に帯同する。"
        },
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "仕事イベント",
        title: "「車は空港の立駐に停めて、そこから飛ぶぞ」",
        body: "出張の始まりは、意外と足元にある。\n自社で手がけた立体駐車場が、今日の出発点になる。",
        choices: [
          { label: "立駐へ向かう", next: "parking" }
        ]
      },
      parking: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "空港の立体駐車場",
        title: "鉄骨の階段を上がりながら、納めた仕事を思い出す。",
        body: "自分が関わった案件かどうかはまだ分からない。\nでも『止められる場所』をつくる仕事が、旅の入口になっている。",
        choices: [
          { label: "出発ゲートへ進む", next: "abroad" },
          { label: "現場写真を一枚撮る", next: "abroad" }
        ]
      },
      abroad: {
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "出張のあと",
        title: "海外の会議室でも、戻る場所の話が出る。",
        body: "部品の仕様、納期、安全基準。\n帰り道はまた、あの立駐のコンクリートの上から始まる。",
        choices: [
          { label: "現場のプロとして深掘りする", next: "end-craft" },
          { label: "グループ連携の仕事も見てみる", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        kicker: "この人生の感触",
        title: "立つ場所、停める場所、備える場所をつくる仕事が残った。",
        body: "派手さより、毎日の積み重ねが自分を形づくる。\n気になるなら、次は本物の職場で温度を確かめてほしい。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        kicker: "この人生の感触",
        title: "一つの現場が、別の会社の一日につながっていると分かった。",
        body: "林郷の家の木、ホームメイドの備品、空港の立駐。\nグループは、別々に見えて一本の生活圏になっている。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function houseLinkedQuest() {
    const name = "株式会社綿伴林郷の家";
    return {
      start: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: `QUEST / ${name}`,
        title: "入社一年目。図面と会話が行き来する。",
        body: "家は、人の時間を入れる器だ。\nお客様の『朝の光がほしい』が、寸法になって戻ってくる。",
        choices: [
          { label: "モデルハウスで案内を覚える", next: "model" },
          { label: "お客様の打ち合わせに同席する", next: "client" }
        ]
      },
      model: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "モデルハウス",
        title: "木の梁の下で、暮らしの想像を一緒にする。",
        body: "ソファの位置、階段の手触り、キッチンの色。\n家が決まると、次は家具の会社の名前が自然に出る。",
        choices: [
          { label: "『疲れがほどける家』の案内をする", next: "recover" },
          { label: "家具の相談へつなぐ", next: "to-ligna" }
        ]
      },
      recover: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "展示場",
        title: "家事の動線が短いほど、夜の自分を取り戻しやすい。",
        body: "木の手触り、光、静けさ。五感の休め方が間取りに入っている。\n『住む』は、回復の設計でもある。",
        choices: [
          { label: "お客様に体感してもらう", next: "client" },
          { label: "家具の相談へつなぐ", next: "to-ligna" }
        ]
      },
      client: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "お客様",
        img: "assets/char-customer-woman.png",
        kicker: "打ち合わせ",
        title: "『このすき間、何か収まるかな』と図面を指差される。",
        body: "既製家具では埋まらない寸法がある。\nそんなとき、グループの家具製造・太平洋の名前が手元に出る。",
        choices: [
          { label: "リグナと大洋を紹介する", next: "to-ligna" }
        ]
      },
      "to-ligna": {
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "連携 / リグナチュラ",
        title: "新居の家具は、リグナで選んでもらうことになった。",
        body: "家の骨組みは林郷の家。景色はリグナ。\n同じグループだと、図面の共有が早い。",
        choices: [
          { label: "すき間の収納も相談する", next: "to-taiyo" }
        ]
      },
      "to-taiyo": {
        bg: "assets/backgrounds/bg-taiyo-exterior.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "連携 / 太平洋",
        title: "家具のすき間にぴったりの収納を、大洋へ頼む。",
        body: "ミリ単位の注文が、工場の板取りに変わる。\n『建てる』の続きが、『収める』になる瞬間だ。",
        choices: [
          { label: "現場のプロとして深掘りする", next: "end-craft" },
          { label: "暮らし全体をつなぐ仕事を選ぶ", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "この人生の感触",
        title: "家の図面の向こうに、人の一日が見えるようになった。",
        body: "派手さより、毎日の積み重ねが自分を形づくる。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "この人生の感触",
        title: "家・家具・収納が、一続きの仕事だと分かった。",
        body: "林郷の家、リグナ、大洋。社名は分かれても、暮らしはひとつの現場だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function lignaLinkedQuest() {
    const name = "リグナチュラ株式会社";
    return {
      start: {
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        kicker: `QUEST / ${name}`,
        title: "入社一年目。画面の商品が、部屋の景色に変わる。",
        body: "おうちの景色を、やさしく整える仕事。\n今日のお客様は、林郷の家で建てたばかりの新居だという。",
        choices: [
          { label: "店頭でコーディネートする", next: "shop" },
          { label: "図面を見ながら提案する", next: "plan" }
        ]
      },
      shop: {
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "店頭",
        title: "新居用の家具が、カートに静かに積み上がる。",
        body: "ソファ、照明、ラグ。\n『ここにテーブルを置くと、朝がきれい』——家の話が家具の話になる。",
        choices: [
          { label: "買い付け担当の一日を見る", next: "buyer" },
          { label: "すき間の相談を受ける", next: "gap" }
        ]
      },
      plan: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "お客様",
        img: "assets/char-customer-man.png",
        kicker: "図面打合せ",
        title: "林郷の家の図面を広げて、家具の寸法を合わせる。",
        body: "グループ内だと、間取りのデータがすぐ届く。\n『建てる人』と『整える人』が、同じ図を見られる。",
        choices: [
          { label: "買い付け担当の一日を見る", next: "buyer" },
          { label: "すき間の相談を受ける", next: "gap" }
        ]
      },
      buyer: {
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "ライフスタイル",
        title: "今日の一品は、暮らしを少しだけ豊かにする道具。",
        body: "照明、食器、外で使う小物、軽やかなおやつ。\n売場の反応を見て、次の仕入れが決まる。",
        choices: [
          { label: "すき間の相談を受ける", next: "gap" }
        ]
      },
      gap: {
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        speaker: "先輩・浜田",
        img: "assets/char-work-senior-man.png",
        kicker: "連携 / 太平洋",
        title: "既製品では埋まらないすき間を、大洋の特注で埋める。",
        body: "家具の横に、ぴったりの収納が欲しい。\n注文票には、リグナの品番と大洋の寸法が並ぶ。",
        choices: [
          { label: "景色をつくる仕事を深める", next: "end-craft" },
          { label: "家づくり全体との連携を学ぶ", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-rigna-storefront.jpg",
        kicker: "この人生の感触",
        title: "部屋の景色を変える手が、自分にもあると分かった。",
        body: "商品は物でも、渡しているのは暮らしの空気だ。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "この人生の感触",
        title: "家具の仕事は、家の仕事の続きだと分かった。",
        body: "林郷の家で骨組み、リグナで景色、大洋ですき間。\n別会社でも、お客様の一日はつながっている。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function taiyoLinkedQuest() {
    const name = "太平洋株式会社";
    const senior = "assets/char-work-senior-man.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-taiyo-exterior.jpg",
        kicker: `QUEST / ${name}`,
        title: "入社一年目。部品が、ぴたっと家具になる現場。",
        body: "白い壁の工場。青い柱の荷捌き場。\n今日の注文票には、リグナ経由の『すき間収納』と書いてある。",
        choices: [
          { label: "工場の通路を歩く", next: "factory" },
          { label: "寸法の確認から入る", next: "measure" }
        ]
      },
      factory: {
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "工場",
        title: "青い通路の奥で、板が家具の部品へ変わっていく。",
        body: "林郷の家の新居、リグナのソファ横。\n数字の並びが、誰かの朝の動作になる。",
        choices: [
          { label: "特注の図面を見る", next: "measure" },
          { label: "街で使う什器の製作を見る", next: "kiosk" }
        ]
      },
      measure: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "特注対応",
        title: "家具のすき間にぴったりの収納を、ミリで合わせる。",
        body: "既製品の端と、壁の端。そのあいだを埋めるのが今日の仕事だ。\nグループの注文は、現場の言葉が短い。",
        choices: [
          { label: "街で使う什器の製作も見る", next: "kiosk" },
          { label: "製造の腕を磨く", next: "end-craft" }
        ]
      },
      kiosk: {
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "什器",
        title: "街の片隅で人が触る道具も、工場の手から生まれる。",
        body: "耐久、使いやすさ、運びやすさ。\n家具づくりの技術が、都市の小さな設備にも生きる。",
        choices: [
          { label: "製造の腕を磨く", next: "end-craft" },
          { label: "暮らしの連携をもっと知る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        kicker: "この人生の感触",
        title: "ぴたっと収まる感覚が、仕事の手応えになった。",
        body: "派手さより、寸法の正しさが人のストレスを減らす。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-taiyo-exterior.jpg",
        kicker: "この人生の感触",
        title: "工場の一枚の板が、家の一日につながると分かった。",
        body: "リグナの家具、林郷の家の壁、大洋の収納。\nすき間を埋める仕事は、暮らしをなめらかにする仕事だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function miharaLinkedQuest() {
    const name = "株式会社綿伴美原商店";
    return {
      start: {
        bg: "assets/backgrounds/bg-tea-shop-exterior.jpg",
        kicker: `QUEST / ${name}`,
        title: "入社一年目。香りと味の現場。お客様の『おいしい』が近い。",
        body: "お茶とおかし、カフェのやさしい香り。\n今日はホームメイドとの共同売場の打ち合わせがある。",
        choices: [
          { label: "ショーケースの前で商品を覚える", next: "counter" },
          { label: "喫茶席のオペレーションを見る", next: "cafe" }
        ]
      },
      counter: {
        bg: "assets/backgrounds/bg-tea-shop-counter.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "売場",
        title: "色とりどりの和菓子が、ガラスの向こうで季節を並べている。",
        body: "ホームメイドの棚に載せるお茶も、ここから選ぶ。\n別会社の売場が、同じ香りでつながる。",
        choices: [
          { label: "上生菓子の仕込みを見る", next: "sweets" }
        ]
      },
      cafe: {
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "喫茶",
        title: "木の席に、休日のお客様と、仕事帰りの人が混ざる。",
        body: "ここで飲む一杯が、誰かのデートになることもある。\n仕事の場所が、暮らしの場所にもなる。",
        choices: [
          { label: "上生菓子の仕込みを見る", next: "sweets" }
        ]
      },
      sweets: {
        bg: "assets/backgrounds/bg-jonamashi.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "上生菓子",
        title: "小さな練り切りが、今日の季節を一言で言う。",
        body: "ホームメイドへ卸す茶葉の横で、店頭の菓子も同じ朝に動いている。\n『グループ連携』は、会議室より先に香りの現場にある。",
        choices: [
          { label: "季節のフルーツ菓子を見る", next: "seasonal" },
          { label: "味の現場を深掘りする", next: "end-craft" }
        ]
      },
      seasonal: {
        bg: "assets/backgrounds/bg-jonamashi.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "季節限定",
        title: "旬の実を包んだ菓子と、焼きたての甘い香り。",
        body: "果物の生菓子、りんごを入れたまんじゅう。\nお茶との合わせ方まで考えると、売場が物語になる。",
        choices: [
          { label: "味の現場を深掘りする", next: "end-craft" },
          { label: "他店との企画をもっと知る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        kicker: "この人生の感触",
        title: "おいしいの顔が見える仕事が、残った。",
        body: "香りと味の距離が近いほど、判断も早くなる。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        kicker: "この人生の感触",
        title: "お茶の仕事が、別の店の一日とつながると分かった。",
        body: "美原商店の菓子、ホームメイドの売場、誰かの休日の喫茶。\n社名が分かれても、体験は一本の線になる。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  // --- 汎用寄り企業：公開してよい「仕事の感触」だけ。実名・固有案件・数値は入れない ---

  function partnersThemeQuest() {
    const name = "綿伴ハートナーズ株式会社";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "入社一年目。店の裏側で、『売れる前』の仕事が動いている。",
        body: "仕入れ、企画、倉庫。お店に並ぶ前の一日が、ここにある。\n今日は、新しい定番づくりの打合せだ。",
        choices: [
          { label: "冬の小さな暖房の企画に入る", next: "heater" },
          { label: "家庭の味シリーズの試作を見る", next: "sauce" }
        ]
      },
      heater: {
        kicker: "商品企画",
        title: "『狭い場所でも安心』が、仕様の言葉になる。",
        body: "省エネか、あたたかさか、置きやすさか。\n優先順位で、完成の形が変わる。",
        choices: [
          { label: "置きやすさを最優先にする", next: "test" },
          { label: "あたたかさを最優先にする", next: "test" }
        ]
      },
      sauce: {
        kicker: "商品企画",
        title: "プロの刺激と、家庭のやさしさ。味の真ん中を探す。",
        body: "辛さの強さは数字だけじゃない。\n『もう一皿ほしい』がゴールだ、と先輩が言う。",
        choices: [
          { label: "刺激寄りで勝負する", next: "test" },
          { label: "家庭向けにやわらげる", next: "test" }
        ]
      },
      test: {
        kicker: "現場",
        title: "試作品が机に並び、意見が短い言葉で飛ぶ。",
        body: "いい／惜しい／まだ早い。\n商品は、会議室より先に『口』と『手』で決まる。",
        choices: [
          { label: "企画側の仕事を深掘りする", next: "end-craft" },
          { label: "店と倉庫のつながりも見る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "『並ぶ前』をつくる仕事が、残った。",
        body: "派手なCMより、毎日の使いやすさが勝負になる。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "企画と現場が、一本の線だと分かった。",
        body: "倉庫の段ボールと、売場の棚は隣同士だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function dotcomThemeQuest() {
    const name = "株式会社綿伴ドアットコム";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "画面の向こうにも、店舗の熱がある。",
        body: "注文、梱包、問い合わせ。数字の裏に人がいる。\n今日は、まとめ買いの店の周年イベント準備だ。",
        choices: [
          { label: "売場の装飾と動線を整える", next: "floor" },
          { label: "季節キャンペーンの案を出す", next: "campaign" }
        ]
      },
      floor: {
        kicker: "店舗",
        title: "カートがぶつからない道が、いちばんのおもてなし。",
        body: "安いだけじゃない。取りやすさと見やすさが売上を支える。",
        choices: [
          { label: "入口の案内をわかりやすくする", next: "day" },
          { label: "レジ前の待ち時間を減らす工夫をする", next: "day" }
        ]
      },
      campaign: {
        kicker: "企画",
        title: "『お得』の言葉は、短いほど届く。",
        body: "全品セールか、季節のまとめか。\n選び方で、来る人の顔が変わる。",
        choices: [
          { label: "誰でもわかりやすい全品訴求", next: "day" },
          { label: "季節テーマで世界観をつくる", next: "day" }
        ]
      },
      day: {
        kicker: "当日",
        title: "開店前の空気が、いちばん緊張する。",
        body: "スタッフの声、カートの軋み、初めてのお客様の表情。\n画面の注文も、店頭の笑顔も、同じ一日だ。",
        choices: [
          { label: "店舗オペを深掘りする", next: "end-craft" },
          { label: "オンライン側との連携を見る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "『届ける』の現場感が、残った。",
        body: "クリックの先にも、人の一日がある。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "ネットと店が、対立じゃなく往復だと分かった。",
        body: "画面と売場は、別々の会社みたいに見えて一本だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function shineThemeQuest() {
    const name = "株式会社綿伴林業SHINE";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "家づくりの店を、後ろから支える一日。",
        body: "モデルハウスの匂い、図面の線、加盟店からの相談電話。\n『建てる』の前に、『伝える』がある。",
        choices: [
          { label: "モデルハウスの案内を覚える", next: "model" },
          { label: "加盟店サポートの打合せに入る", next: "fc" }
        ]
      },
      model: {
        kicker: "展示場",
        title: "木のあたたかさは、言葉より先に手触りで伝わる。",
        body: "お客様は価格表より、朝の光と廊下の音を見ている。",
        choices: [
          { label: "暮らしのシーンで説明する", next: "tour" },
          { label: "構造の安心を先に説明する", next: "tour" }
        ]
      },
      fc: {
        kicker: "サポート",
        title: "遠方の店の悩みが、画面越しに届く。",
        body: "同じ看板でも、土地が違えば困りごとも違う。\n後ろ盾の仕事は、翻訳に近い。",
        choices: [
          { label: "現場の工夫を共有する", next: "tour" },
          { label: "説明資料を一緒に整える", next: "tour" }
        ]
      },
      tour: {
        kicker: "一日の終わり",
        title: "『ここに住みたい』が、短く残る。",
        body: "家は商品であり、誰かのこれからでもある。\nその両方が机の上にある。",
        choices: [
          { label: "案内の腕を磨く", next: "end-craft" },
          { label: "加盟店支援の仕事を深める", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "木の家を『体感で伝える』仕事が残った。",
        body: "説明は、説得より体験に近い。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "一軒の家の向こうに、いくつもの店があると分かった。",
        body: "支える側の仕事も、家づくりの一部だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function tradingThemeQuest() {
    const name = "綿伴トレジャーディング株式会社";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "まだ知らない『おいしい』を、机に乗せる仕事。",
        body: "産地、品質、伝え方。新しい食材は、説明から始まる。\n今日は、珍しい野菜の試食会だ。",
        choices: [
          { label: "味の紹介コーナーを担当する", next: "taste" },
          { label: "売り場向けの説明カードを作る", next: "card" }
        ]
      },
      taste: {
        kicker: "試食会",
        title: "『食べたことない』が、笑顔に変わる瞬間がある。",
        body: "最初は警戒、次に興味、最後に質問。\n新しい食は、会話の設計でもある。",
        choices: [
          { label: "レシピ例を一緒に渡す", next: "sell" },
          { label: "産地の話を短く添える", next: "sell" }
        ]
      },
      card: {
        kicker: "伝材",
        title: "難しい言葉を、棚の前の一文にする。",
        body: "専門用語は誇りだけど、お客様の一歩目には重い。",
        choices: [
          { label: "やさしい言葉で書き直す", next: "sell" },
          { label: "写真多めにして直感で伝える", next: "sell" }
        ]
      },
      sell: {
        kicker: "そのあと",
        title: "知る・食べる・売るが、同じチームの一日になる。",
        body: "新しいものは、押すほど売れない。\n理解が先、注文はあと。",
        choices: [
          { label: "食の新規を深掘りする", next: "end-craft" },
          { label: "流通と店舗の連携を見る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "『初めて』を届ける仕事が、残った。",
        body: "好奇心は、仕入れのスキルになる。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "産地と売場のあいだに、自分の席があると分かった。",
        body: "運ぶだけじゃない。意味も運ぶ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function kenzaiThemeQuest() {
    const name = "綿伴健材株式会社";
    const senior = "assets/char-work-senior-man.png";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "家の骨組みを支える資材が、今日の主役。",
        body: "木の名前、届け先、品質の基準。\n『安心』は、目に見えないところに積まれる。",
        choices: [
          { label: "地元の木を使った住宅資材を学ぶ", next: "local" },
          { label: "現場への納品に同行する", next: "deliver" }
        ]
      },
      local: {
        speaker: "先輩・樫",
        img: senior,
        kicker: "品質",
        title: "基準を超える、はスローガンじゃなくチェック表だ。",
        body: "見えない部分ほど、後から効いてくる。\nだから今日の確認が、十年後の暮らしになる。",
        choices: [
          { label: "安全の説明を練習する", next: "talk" },
          { label: "快適さの説明を練習する", next: "talk" }
        ]
      },
      deliver: {
        speaker: "先輩・樫",
        img: senior,
        kicker: "納品",
        title: "現場の朝は、資材の到着から始まる。",
        body: "遅れると作業が止まる。早すぎても置き場がない。\nタイミングも技術のうちだ。",
        choices: [
          { label: "現場監督の話を聞く", next: "talk" },
          { label: "積み下ろしを手伝う", next: "talk" }
        ]
      },
      talk: {
        speaker: "先輩・樫",
        img: senior,
        kicker: "一日の芯",
        title: "資材の話が、家族の『ここがいい』につながる。",
        body: "直接お客様に会わなくても、暮らしの土台をつくっている。",
        choices: [
          { label: "資材のプロを目指す", next: "end-craft" },
          { label: "住宅会社との連携を深める", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "見えない部分を支える仕事が、残った。",
        body: "派手さより、確かさが残る。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "資材と家づくりが、一つの現場だと分かった。",
        body: "グループの住宅会社と、言葉が通じやすい。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function realestateThemeQuest() {
    const name = "綿伴レアルエステート株式会社";
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "『住みたい』の理由は、人の数だけある。",
        body: "間取り、通学、日当たり、静けさ。\n物件は数字だけじゃ届かない。",
        choices: [
          { label: "住まい探しの案内に同行する", next: "guide" },
          { label: "おうちの清潔サービス説明を聞く", next: "clean" }
        ]
      },
      guide: {
        kicker: "案内",
        title: "鍵を開けた瞬間の表情が、いちばん正直。",
        body: "良い点を並べるより、暮らしの想像を一緒に描く。",
        choices: [
          { label: "通勤のしやすさを重視して提案する", next: "choice" },
          { label: "落ち着ける空間を重視して提案する", next: "choice" }
        ]
      },
      clean: {
        kicker: "サービス",
        title: "きれい、は見た目だけじゃない。",
        body: "家の空気や、触れる場所の安心。\n住まいの価値は、掃除の先にもある。",
        choices: [
          { label: "実演の流れを覚える", next: "choice" },
          { label: "お客様の不安から聞き取る", next: "choice" }
        ]
      },
      choice: {
        kicker: "判断",
        title: "急かすと決まるが、残らない。待つと遅いが、残る。",
        body: "不動産の一日は、速度と信頼のバランスゲームだ。",
        choices: [
          { label: "案内の仕事を深掘りする", next: "end-craft" },
          { label: "住まいに付くサービスも学ぶ", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "人のこれからに伴走する仕事が、残った。",
        body: "物件より、『この人と決めたい』が残ることがある。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        kicker: "この人生の感触",
        title: "探す仕事と、整える仕事がつながると分かった。",
        body: "住む前も、住んだあとも、一日がある。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function resortThemeQuest() {
    const name = "株式会社綿伴リゾート";
    return {
      start: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: `QUEST / ${name}`,
        title: "山あいの宿。四季のあたたかさが、仕事の教材になる。",
        body: "チェックイン、食事、お風呂、お見送り。\n一日の流れそのものが、おもてなしだ。",
        choices: [
          { label: "フロントの受け入れを覚える", next: "front" },
          { label: "囲炉裏のある食事処を手伝う", next: "irori" }
        ]
      },
      front: {
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "フロント",
        title: "旅の初めの表情は、ここで決まる。",
        body: "地図の説明、部屋の案内、小さな要望。\n家族連れには、安心の言葉が先に立つ。",
        choices: [
          { label: "子連れのお客様を丁寧に案内する", next: "onsen" },
          { label: "初めての一人旅のお客様を案内する", next: "onsen" }
        ]
      },
      irori: {
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        kicker: "食事処",
        title: "炭の香りが、会話をゆっくりにする。",
        body: "地元の食材、焼き加減、席の温度。\n料理は味だけじゃなく、時間の演出でもある。",
        choices: [
          { label: "焼き場の手元を見て覚える", next: "onsen" },
          { label: "配膳のタイミングを練習する", next: "onsen" }
        ]
      },
      onsen: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: "湯上がり",
        title: "露天の風が、一日の疲れをほどく。",
        body: "宿の仕事は、『休ませる』ための段取りだ。\n自分も動きながら、お客様の静けさを守る。",
        choices: [
          { label: "接客の仕事を深掘りする", next: "end-craft" },
          { label: "料理・場づくり側も見てみる", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-house-interior.jpg",
        kicker: "この人生の感触",
        title: "人を休ませる仕事の手応えが、残った。",
        body: "笑顔の裏に、見えない準備がある。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        kicker: "この人生の感触",
        title: "宿は、食・湯・部屋の連携だと分かった。",
        body: "一つの体験が、いくつもの係の連続でできている。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function woodpowerThemeQuest() {
    const name = "綿伴ウッドフラワー株式会社";
    const senior = "assets/char-work-uniform-field-man.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: `QUEST / ${name}`,
        title: "森と生き、森を生かす。木がエネルギーの現場になる。",
        body: "植える、育てる、使う、また植える。\nその循環の先に、あかりとあたたかさがある。",
        choices: [
          { label: "発電の流れを見学する", next: "plant" },
          { label: "森と資源の循環の話を聞く", next: "cycle" }
        ]
      },
      plant: {
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "発電",
        title: "木くずや端材が、燃料として息づく。",
        body: "燃やす、で終わりじゃない。\n熱が電気になり、地域の暮らしへつながる。",
        choices: [
          { label: "安全確認の手順を覚える", next: "safety" },
          { label: "燃料の受け入れを手伝う", next: "fuel" }
        ]
      },
      cycle: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "循環",
        title: "遠くの化石燃料に頼らない、地産地消のエネルギー。",
        body: "森を守りながら使う。使いながら育てる。\n数字の前に、関係性の設計がある。",
        choices: [
          { label: "加工の端材が燃料になる工程を見る", next: "fuel" },
          { label: "『また植える』側の話を聞く", next: "safety" }
        ]
      },
      fuel: {
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "燃料",
        title: "チップの山が、次の電力の準備になる。",
        body: "水分、量、運び方。燃え方は、手入れの結果だ。\n現場は静かに見えるが、判断は連続している。",
        choices: [
          { label: "運転監視の部屋へ行く", next: "watch" }
        ]
      },
      safety: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "安全",
        title: "再生可能でも、危険ゼロではない。",
        body: "手順書は貼ってあるだけでは意味がない。\n今日の確認が、明日の運転を守る。",
        choices: [
          { label: "運転監視の部屋へ行く", next: "watch" }
        ]
      },
      watch: {
        bg: "assets/backgrounds/bg-holdings-office.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "監視",
        title: "メーターと警報が、森の先の一日を映す。",
        body: "安定して回すことが、いちばんの貢献になることもある。\n派手さより、続く運転。",
        choices: [
          { label: "運転・現場の仕事を深掘りする", next: "end-craft" },
          { label: "森の循環づくり側も見る", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        kicker: "この人生の感触",
        title: "木をエネルギーに変える現場感が、残った。",
        body: "あかりの裏側に、森と人の段取りがある。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: "この人生の感触",
        title: "発電は、森のサイクルの一部だと分かった。",
        body: "使うだけで終わらせない。次の木につながる仕事だ。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function farmThemeQuest() {
    const name = "綿伴ファームフル株式会社";
    const senior = "assets/char-work-uniform-field-woman.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: `QUEST / ${name}`,
        title: "谷あいの牧場。生き物の一日を、仕組みで支える。",
        body: "温度、えさ、清潔さ。手作業だけじゃなく、見守りと自動化が並ぶ。\n今日は、スマートな飼育の現場見学だ。",
        choices: [
          { label: "モニター室で遠隔の見守りを学ぶ", next: "monitor" },
          { label: "えさ作りのラインを見る", next: "feed" }
        ]
      },
      monitor: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "見守り",
        title: "画面の向こうで、小さな変化を拾う。",
        body: "カメラはズームできる。体調のサインは、数字より先に『様子』で出ることもある。\n人が入らない時間を守ることも、健康のための仕事だ。",
        choices: [
          { label: "出荷の仕分けの仕組みを見る", next: "sort" },
          { label: "快適さの自動調整を見る", next: "climate" }
        ]
      },
      feed: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "えさ",
        title: "地元の素材が、配合のレシピになる。",
        body: "粉砕して混ぜて、今日の体調に合わせる。\n水は澄んだ湧き水。口に入るものから一日が始まる。",
        choices: [
          { label: "出荷の仕分けの仕組みを見る", next: "sort" },
          { label: "快適さの自動調整を見る", next: "climate" }
        ]
      },
      sort: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "仕分け",
        title: "体重に応じて、次の場所へ案内する装置が動く。",
        body: "力任せじゃなく、流れで判断する。\n出荷も、生き物のリズムに合わせた段取りだ。",
        choices: [
          { label: "清掃ロボットの動きも追う", next: "clean" }
        ]
      },
      climate: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "環境",
        title: "温度・湿度・空気。見えない快適を機械が整える。",
        body: "小さな個体ほど寒さに弱い。\nあたたかい場所をつくることも、飼育の技術だ。",
        choices: [
          { label: "清掃ロボットの動きも追う", next: "clean" }
        ]
      },
      clean: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "清潔",
        title: "霧とロボットが、静かに床を整えていく。",
        body: "きれいさは、においの前に仕組みで守る。\n人の手は、必要なときに必要な場所へ。",
        choices: [
          { label: "飼育の現場感を深掘りする", next: "end-craft" },
          { label: "仕組みづくり側も見てみる", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: "この人生の感触",
        title: "生き物の一日に合わせる仕事が、残った。",
        body: "自動化しても、観察する目は残る。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        kicker: "この人生の感触",
        title: "世話と仕組みが、同じ現場だと分かった。",
        body: "ITも、えさも、清潔さも、命のまわりにある。",
        reality: [
          { label: "グループの他社も比べてみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function migrateQuest(place, flavor) {
    return {
      start: {
        kicker: `QUEST / ${place}`,
        title: `${place}に降り立つと、空が広い。`,
        body: `${flavor}\n便利さの地図が、いったん書き換わる。`,
        choices: [
          { label: "地域の仕事に関わってみる", next: "work" },
          { label: "まず暮らしの拠点を整える", next: "life" }
        ]
      },
      work: {
        kicker: "選択のあと",
        title: "仕事は「職種」より「誰の顔が見えるか」で選ばれる。",
        body: `${place}では、貢献がすぐ返ってくる。\nそのぶん、責任の輪郭もはっきりする。`,
        choices: [
          { label: "この土地で必要な仕事を引き受ける", next: "end-root" },
          { label: "外との往復も残してみる", next: "end-bridge" }
        ]
      },
      life: {
        kicker: "選択のあと",
        title: "暮らしが整うと、時間が戻ってくる感覚がある。",
        body: "通勤の消耗が減る。その代わり、移動の選択肢は減る。\n何を得て、何を手放すかが、とても具体的だ。",
        choices: [
          { label: "このペースを軸に働き方を探す", next: "end-root" },
          { label: "都会との二拠点も試す", next: "end-bridge" }
        ]
      },
      "end-root": {
        ending: true,
        kicker: "この人生の感触",
        title: `${place}は、スローな引退先じゃない。生活の設計問題だ。`,
        body: "静かさと、つながりの濃さはセットで来る。\n「ありかも」が残ったなら、短い滞在で確かめてほしい。",
        reality: [
          { label: `${place}のお試し移住を調べる`, href: "#reality-town" },
          { label: "自治体の体験企画を見る", href: "#reality-event" }
        ]
      },
      "end-bridge": {
        ending: true,
        kicker: "この人生の感触",
        title: "住む場所は、二者択一じゃなくてもよかった。",
        body: `${place}を拠点にしながら、外ともつながる。\n距離感を自分で設計できる感覚が残った。`,
        reality: [
          { label: `${place}の短期間滞在を探す`, href: "#reality-town" },
          { label: "地方の仕事体験を調べる", href: "#reality-work" }
        ]
      }
    };
  }

  function simpleQuest(label, startTitle, startBody, a, b, endA, endB) {
    return {
      start: {
        kicker: `QUEST / ${label}`,
        title: startTitle,
        body: startBody,
        choices: [
          { label: a.label, next: "pathA" },
          { label: b.label, next: "pathB" }
        ]
      },
      pathA: {
        kicker: "選択のあと",
        title: a.title,
        body: a.body,
        choices: [
          { label: a.nextLabel, next: "endA" },
          { label: b.nextLabel, next: "endB" }
        ]
      },
      pathB: {
        kicker: "選択のあと",
        title: b.title,
        body: b.body,
        choices: [
          { label: a.nextLabel, next: "endA" },
          { label: b.nextLabel, next: "endB" }
        ]
      },
      endA: {
        ending: true,
        kicker: "この人生の感触",
        title: endA.title,
        body: endA.body,
        reality: endA.reality
      },
      endB: {
        ending: true,
        kicker: "この人生の感触",
        title: endB.title,
        body: endB.body,
        reality: endB.reality
      }
    };
  }

  function schoolQuest(name, flavor, focusA, focusB, kind) {
    const meta = {
      highschool: {
        span: "三年",
        realityA: [
          { label: "気になる高校のオープンスクールを調べる", href: "#reality-campus" },
          { label: "進路体験を探す", href: "#reality-class" }
        ],
        realityB: [
          { label: "別タイプの高校も比べてみる", href: "#reality-campus" },
          { label: "今の自分に近い学び方を探す", href: "#reality-class" }
        ]
      },
      univ: {
        span: "四年",
        realityA: [
          { label: "オープンキャンパスを調べる", href: "#reality-campus" },
          { label: "体験授業を探す", href: "#reality-class" }
        ],
        realityB: [
          { label: "別タイプの大学も比べてみる", href: "#reality-campus" },
          { label: "学生プロジェクト事例を見る", href: "#reality-class" }
        ]
      },
      skill: {
        span: "学びの期間",
        realityA: [
          { label: "専門学校の体験授業を探す", href: "#reality-class" },
          { label: "技術職の職場見学を調べる", href: "#reality-work" }
        ],
        realityB: [
          { label: "別分野の専門学校も見る", href: "#reality-campus" },
          { label: "現場体験の機会を探す", href: "#reality-work" }
        ]
      }
    };
    const m = meta[kind] || meta.highschool;
    return simpleQuest(
      name,
      `${name}の門をくぐった。${flavor}`,
      `正解の${m.span}はない。どんな自分で過ごすかが、景色を変える。`,
      {
        label: focusA.label,
        title: focusA.title,
        body: focusA.body,
        nextLabel: `この空気のまま${m.span}を想像する`
      },
      {
        label: focusB.label,
        title: focusB.title,
        body: focusB.body,
        nextLabel: "別の自分の過ごし方も見る"
      },
      {
        title: `${name}で過ごした感触が残った。`,
        body: focusA.ending,
        reality: m.realityA
      },
      {
        title: `${name}は、別の自分にも開いていた。`,
        body: focusB.ending,
        reality: m.realityB
      }
    );
  }

  window.LIFE_QUEST = {
    categories: [
      {
        id: "highschool",
        label: "高校へ進む",
        short: "高校",
        hint: "校風の違う高校で、三年の感触を試す",
        branchTitle: "どの高校を試す？",
        branchNote: "強い学校＝正解ではない。必要能力と、今の自分の距離を見て選ぼう",
        theme: "univ",
        img: "assets/char-campus.png",
        speaker: "先輩",
        x: 40,
        y: 40,
        options: [
          {
            id: "hs-kaisei",
            label: "開星高校",
            tag: "難関進学",
            blurb: "模試と自習室が生活のリズムになる三年",
            require: { intellect: 18, calm: 13 },
            scenes: schoolQuest(
              "開星高校",
              "廊下でも参考書を開く人がいる。",
              {
                label: "勉強の型を先につくる",
                title: "地味な復習が、いちばん効いた。",
                body: "点数が上がると、次に挑戦できる幅も広がる。",
                ending: "進学の先はまだぼんやりでも、「続け方」の筋肉がついた。"
              },
              {
                label: "友人と高め合う",
                title: "競争より、並走の三年だった。",
                body: "一人だと折れそうな日も、隣の努力が見える。",
                ending: "知力だけじゃなく、人と並ぶ感覚も残った。"
              }
            )
          },
          {
            id: "hs-nanyo",
            label: "灘陽高校",
            tag: "最難関",
            blurb: "最難関クラス。密度の高い毎日が待つ",
            require: { intellect: 22, calm: 16 },
            scenes: schoolQuest(
              "灘陽高校",
              "空気が薄いほど、集中が澄んでいく。",
              {
                label: "最前線の問題に挑む",
                title: "解けない時間が、むしろ長かった。",
                body: "正解より、問いの立て方を磨かれる。",
                ending: "難問の向こうに、思考の体力が残った。"
              },
              {
                label: "睡眠とペースを守る",
                title: "速さより、続く速度を選んだ。",
                body: "周囲のペースに飲まれないことも、実力のうちだ。",
                ending: "頂点を目指す場所でも、自分の舵は握れる。"
              }
            )
          },
          {
            id: "hs-shizuoka",
            label: "静岡中央高校",
            tag: "地域上位",
            blurb: "地元の上位校。進学も部活も選びやすい",
            require: { intellect: 13, social: 11 },
            scenes: schoolQuest(
              "静岡中央高校",
              "知っている景色の延長に、少し高い天井がある。",
              {
                label: "進学コースを軸にする",
                title: "地元にいながら、視野は外へ向いた。",
                body: "模試の全国順位が、世界の縮尺を変える。",
                ending: "身近な場所からでも、遠くを狙える三年だった。"
              },
              {
                label: "部活と両立する",
                title: "時間の使い方が上手くなった。",
                body: "全部はできない。優先順位が自分をつくる。",
                ending: "進学だけが高校じゃない、と体で分かった。"
              }
            )
          },
          {
            id: "hs-tokai-tech",
            label: "東海工科高校",
            tag: "工業・技術",
            blurb: "実習が主役。手を動かして進路を探す",
            require: { skill: 15, stamina: 12 },
            scenes: schoolQuest(
              "東海工科高校",
              "座学より先に、道具が渡される。",
              {
                label: "実習を軸にする",
                title: "上手い下手は、すぐに作品に出る。",
                body: "失敗も次の課題になる。成長が目に見える。",
                ending: "「好き」が「できる」に近づくと、次の一歩が軽い。"
              },
              {
                label: "一般科目もバランスよく",
                title: "両輪があると、進路の幅が残る。",
                body: "専門だけに閉じない三年も、強い選択だ。",
                ending: "技術と学びの両方が、選択肢を増やした。"
              }
            )
          },
          {
            id: "hs-sokai-sports",
            label: "蒼海体育高校",
            tag: "スポーツ",
            blurb: "朝練から一日が始まる。身体が教科書になる",
            require: { stamina: 16, courage: 13, social: 11 },
            scenes: schoolQuest(
              "蒼海体育高校",
              "グラウンドの音が、校舎より近い。",
              {
                label: "試合で結果を取りにいく",
                title: "勝ち負けより、準備の密度が残った。",
                body: "本番の緊張は、勇気のトレーニングだ。",
                ending: "身体を張った三年は、自信の根拠になった。"
              },
              {
                label: "チームを支える役に回る",
                title: "エースじゃなくても、必要とされる場所がある。",
                body: "声かけ、整列、ケア。勝敗の裏側を動かす。",
                ending: "社交と体力が、同じ場所で育った。"
              }
            )
          },
          {
            id: "hs-seisai-art",
            label: "星彩芸術高校",
            tag: "美術・芸術",
            blurb: "アトリエが教室。感覚を技術に変える三年",
            require: { skill: 15, calm: 13, intellect: 11 },
            scenes: schoolQuest(
              "星彩芸術高校",
              "白い壁に、まだ乾かない絵の具の匂い。",
              {
                label: "作品を外に出す",
                title: "公開した瞬間、評価が自分を通り過ぎる。",
                body: "褒めも批判も、次の制作の材料になる。",
                ending: "表現は才能の証明より、続ける習慣だった。"
              },
              {
                label: "基礎デッサンを積み上げる",
                title: "地味な線が、いちばん効いた。",
                body: "感覚だけに頼らず、手に型が入っていく。",
                ending: "技術がつくと、伝えたいことが言葉になる。"
              }
            )
          }
        ]
      },
      {
        id: "work",
        label: "企業で働く",
        short: "企業",
        hint: "まずは「働く」を選ぶ。次に会社を選ぶ",
        branchTitle: "どの会社で試す？",
        branchNote: "グループ会社を選んでQUESTへ（社名はかわいくデフォルメしたデモ用）",
        theme: "bigco",
        img: "assets/char-office.png",
        speaker: "先輩社員",
        x: 22,
        y: 30,
        options: [
          {
            id: "co-homeaid",
            label: "株式会社綿伴ホームメイド",
            tag: "小売",
            blurb: "備品もお茶売場も。グループの店とつながる日常",
            scenes: homeMadeEventQuest()
          },
          {
            id: "co-solutions",
            label: "綿伴ソウリューションズ株式会社",
            tag: "建築・設備",
            blurb: "木造倉庫から空港の立駐まで。出張の足元も現場",
            img: "assets/char-work-uniform-site-man.png",
            scenes: solutionsLinkedQuest()
          },
          {
            id: "co-mihara",
            label: "株式会社綿伴美原商店",
            tag: "食品・茶",
            blurb: "お茶・上生菓子・喫茶。休日のデートにもなる店",
            scenes: miharaLinkedQuest()
          },
          {
            id: "co-house",
            label: "株式会社綿伴林郷の家",
            tag: "住宅",
            blurb: "家を建て、家具と収納までグループでつなぐ",
            scenes: houseLinkedQuest()
          },
          {
            id: "co-partners",
            label: "綿伴ハートナーズ株式会社",
            tag: "仕入・商品企画",
            blurb: "お店に並ぶ前の、企画と裏側を支える",
            scenes: partnersThemeQuest()
          },
          {
            id: "co-taiyo",
            label: "太平洋株式会社",
            tag: "家具製造",
            blurb: "家具のすき間にぴったりの収納を、工場でつくる",
            img: "assets/char-work-senior-man.png",
            scenes: taiyoLinkedQuest()
          },
          {
            id: "co-ligna",
            label: "リグナチュラ株式会社",
            tag: "インテリア",
            blurb: "新居の家具を選び、特注収納までつなぐ",
            scenes: lignaLinkedQuest()
          },
          {
            id: "co-dotcom",
            label: "株式会社綿伴ドアットコム",
            tag: "通販・店舗",
            blurb: "画面と店舗、両方で『届ける』を試す",
            scenes: dotcomThemeQuest()
          },
          {
            id: "co-house-fc",
            label: "株式会社綿伴林業SHINE",
            tag: "住宅FC",
            blurb: "モデルハウスと加盟店を、後ろから支える",
            scenes: shineThemeQuest()
          },
          {
            id: "co-trading",
            label: "綿伴トレジャーディング株式会社",
            tag: "原料・食材",
            blurb: "まだ知らないおいしさを、ていねいに届ける",
            scenes: tradingThemeQuest()
          },
          {
            id: "co-kenzai",
            label: "綿伴健材株式会社",
            tag: "建材",
            blurb: "家の骨組みを、木と資材で支える",
            img: "assets/char-work-senior-man.png",
            scenes: kenzaiThemeQuest()
          },
          {
            id: "co-woodpower",
            label: "綿伴ウッドフラワー株式会社",
            tag: "エネルギー",
            blurb: "森を生かし、木からあかりをつくる",
            img: "assets/char-work-uniform-field-man.png",
            scenes: woodpowerThemeQuest()
          },
          {
            id: "co-realestate",
            label: "綿伴レアルエステート株式会社",
            tag: "不動産",
            blurb: "住みたいを探し、暮らしの安心も添える",
            scenes: realestateThemeQuest()
          },
          {
            id: "co-resort",
            label: "株式会社綿伴リゾート",
            tag: "宿・観光",
            blurb: "山あいの宿で、四季のあたたかさをおもてなし",
            scenes: resortThemeQuest()
          },
          {
            id: "co-farm",
            label: "綿伴ファームフル株式会社",
            tag: "畜産・スマート飼育",
            blurb: "見守りと仕組みで、生き物の一日を支える",
            img: "assets/char-work-uniform-field-woman.png",
            scenes: farmThemeQuest()
          }
        ]
      },
      {
        id: "migrate",
        label: "地方で暮らす",
        short: "移住",
        hint: "まずは「暮らす場所」を選ぶ。次に県を選ぶ",
        branchTitle: "どこの県で試す？",
        branchNote: "気になる地域を選んで、暮らしのQUESTへ",
        theme: "local",
        img: "assets/char-local-woman.png",
        speaker: "地域の人",
        x: 72,
        y: 68,
        options: [
          {
            id: "pref-nagano",
            label: "長野県",
            tag: "信州",
            blurb: "山と街の距離が近い暮らし",
            scenes: migrateQuest("長野県", "駅を出ると、風が少し冷たい。観光地の顔と、生活の顔が同居している。")
          },
          {
            id: "pref-shizuoka",
            label: "静岡県",
            tag: "東海",
            blurb: "海と山、どちらも近い場所",
            scenes: migrateQuest("静岡県", "空が開けていて、移動の選択肢が思ったより多い。")
          },
          {
            id: "pref-niigata",
            label: "新潟県",
            tag: "北陸側",
            blurb: "雪と田園がつくる季節のメリハリ",
            scenes: migrateQuest("新潟県", "季節の切り替わりがはっきりしていて、暮らしのリズムが変わる。")
          },
          {
            id: "pref-yamanashi",
            label: "山梨県",
            tag: "内陸",
            blurb: "都心との往復も視野に入る距離",
            scenes: migrateQuest("山梨県", "都心を離れた感覚と、まだ戻れる安心が同時にある。")
          }
        ]
      },
      {
        id: "univ",
        label: "大学へ進む",
        short: "大学",
        hint: "校風の違う大学で、四年の感触を試す",
        branchTitle: "どの大学を試す？",
        branchNote: "難関＝正解ではない。必要能力と、今の自分の距離を見て選ぼう",
        theme: "univ",
        img: "assets/char-uni-senior-girl.png",
        speaker: "先輩学生",
        x: 28,
        y: 62,
        options: [
          {
            id: "univ-tohto",
            label: "東都大学",
            tag: "難関国立",
            blurb: "研究の空気が濃い。問いを長く追う四年",
            require: { intellect: 20, calm: 15 },
            scenes: schoolQuest(
              "東都大学",
              "キャンパスは広い。時間割より、余白が多い。",
              {
                label: "研究室やゼミで深く学ぶ",
                title: "一つの問いを追い続けると、世界が細かく見える。",
                body: "すぐに就活の話にはならない。でも、「考える筋力」がつく。",
                ending: "「何を問い続けたいか」が見えると、四年の意味が変わる。"
              },
              {
                label: "学外のプロジェクトにも出る",
                title: "学外は、フィードバックが早い。",
                body: "大学は拠点で、学びの現場は外にもある。",
                ending: "閉じた四年じゃなく、外と往復できる時間だった。"
              },
              "univ"
            )
          },
          {
            id: "univ-keioh",
            label: "慶央義塾大学",
            tag: "私立難関",
            blurb: "私学の難関。人脈と競争が同時に来る",
            require: { intellect: 19, social: 14, calm: 14 },
            scenes: schoolQuest(
              "慶央義塾大学",
              "看板の前で、同期の熱量が先に届く。",
              {
                label: "ゼミと就活を両立する",
                title: "速さの中で、軸を見失わない練習になった。",
                body: "周囲のペースに飲まれないことも、実力のうちだ。",
                ending: "難関の空気でも、自分の舵は握れる。"
              },
              {
                label: "サークルで人を動かす",
                title: "企画を通す経験が、授業より残った。",
                body: "単位とは別の、動かし方の筋肉がつく。",
                ending: "社交と知力が、同じ四年で育った。"
              },
              "univ"
            )
          },
          {
            id: "univ-sowa",
            label: "早稲田総合大学",
            tag: "私立総合",
            blurb: "総合私学。学部の幅が広く、外への出口も多い",
            require: { intellect: 16, social: 14 },
            scenes: schoolQuest(
              "早稲田総合大学",
              "授業のあいだに、学外の予定が埋まっていく。",
              {
                label: "インターンを軸にする",
                title: "現場の言葉は、教科書より早い。",
                body: "失敗も、次の授業の問いになる。",
                ending: "実践のあとで学びに戻ると、問いの質が変わる。"
              },
              {
                label: "学内の活動を育てる",
                title: "仲間と通した企画が、自信の根拠になった。",
                body: "広いキャンパスは、出会いの密度でもある。",
                ending: "総合大学の強さは、選択肢の多さだった。"
              },
              "univ"
            )
          },
          {
            id: "univ-shizuoka",
            label: "静岡国立大学",
            tag: "地域国立",
            blurb: "地元の国立。研究も就職も、距離感が現実的",
            require: { intellect: 15, calm: 12 },
            scenes: schoolQuest(
              "静岡国立大学",
              "知っている街の延長に、少し高い天井がある。",
              {
                label: "地域課題の研究に関わる",
                title: "地元の問いが、全国の景色につながる。",
                body: "身近な場所からでも、遠くを狙える四年だった。",
                ending: "地域に根ざす学びが、進路の軸になった。"
              },
              {
                label: "首都圏の機会にも出てみる",
                title: "往復するほど、自分の居場所が見える。",
                body: "地元に残る／出る、どちらも選びやすくなる。",
                ending: "静岡を拠点に、外とつながる感覚が残った。"
              },
              "univ"
            )
          },
          {
            id: "univ-sokyu-sports",
            label: "蒼穹体育大学",
            tag: "スポーツ",
            blurb: "競技と科学が並ぶ。身体が研究室になる四年",
            require: { stamina: 17, courage: 14, social: 12 },
            scenes: schoolQuest(
              "蒼穹体育大学",
              "朝からグラウンドの音が、講義棟まで届く。",
              {
                label: "競技で結果を取りにいく",
                title: "勝ち負けより、準備の密度が残った。",
                body: "本番の緊張は、勇気のトレーニングだ。",
                ending: "身体を張った四年は、自信の根拠になった。"
              },
              {
                label: "トレーナー／支援側を学ぶ",
                title: "支える側に回ると、試合の見え方が変わる。",
                body: "科学とケアが、勝敗の裏側を動かす。",
                ending: "競技以外の出口も、ちゃんと見えた。"
              },
              "univ"
            )
          },
          {
            id: "univ-seisai-art",
            label: "星彩芸術大学",
            tag: "美術・芸術",
            blurb: "アトリエが研究室。感覚を作品に変える四年",
            require: { skill: 16, calm: 14, intellect: 12 },
            scenes: schoolQuest(
              "星彩芸術大学",
              "白い壁に、まだ乾かない絵の具の匂い。",
              {
                label: "作品を外に出す",
                title: "公開した瞬間、評価が自分を通り過ぎる。",
                body: "褒めも批判も、次の制作の材料になる。",
                ending: "表現は才能の証明より、続ける習慣だった。"
              },
              {
                label: "理論と制作を往復する",
                title: "言葉が増えると、作品の解像度が上がる。",
                body: "感覚だけに頼らず、意図を説明できる四年。",
                ending: "技術と知性が、同じアトリエで育った。"
              },
              "univ"
            )
          }
        ]
      },
      {
        id: "skill",
        label: "専門学校へ進む",
        short: "専門",
        hint: "分野の違う専門学校で、手に職の感触を試す",
        branchTitle: "どの専門学校を試す？",
        branchNote: "早い専門＝正解ではない。必要能力と、今の自分の距離を見て選ぼう",
        theme: "skill",
        img: "assets/char-creator.png",
        speaker: "先輩",
        x: 52,
        y: 22,
        options: [
          {
            id: "voc-monozukuri",
            label: "東海ものづくり専門学校",
            tag: "工業・制作",
            blurb: "実習が主役。手を動かして形にする",
            require: { skill: 15, stamina: 12 },
            scenes: schoolQuest(
              "東海ものづくり専門学校",
              "座学より先に、道具が渡される。",
              {
                label: "基礎を反復して型を入れる",
                title: "地味な反復のあと、手が勝手に動く瞬間が来る。",
                body: "才能の話より、時間の使い方の話になる。",
                ending: "技術は、自信を感覚から根拠に変える。"
              },
              {
                label: "作品を外に出す",
                title: "公開した作品に、想定外の反応が来る。",
                body: "技術は、誰かとの接点で磨かれる。",
                ending: "作ったものが、誰かの役に立つ瞬間が残った。"
              },
              "skill"
            )
          },
          {
            id: "voc-digital",
            label: "デジタルクラフト専門学校",
            tag: "IT・デジタル",
            blurb: "画面の向こうに届く技術を、短期間で積む",
            require: { skill: 14, intellect: 14 },
            scenes: schoolQuest(
              "デジタルクラフト専門学校",
              "黒い画面に、最初の一行を打つ。",
              {
                label: "基礎から丁寧に積む",
                title: "エラーの読み方が、少しずつ分かる。",
                body: "遠回りに見えて、いちばん速い道だったりする。",
                ending: "専門性は進路を狭めず、選べる幅を増やす。"
              },
              {
                label: "小さなサービスを公開する",
                title: "使った人の反応が、次の課題になる。",
                body: "コードは孤独な作業に見えて、実は対話だ。",
                ending: "動くものには、必ず誰かの時間が乗っている。"
              },
              "skill"
            )
          },
          {
            id: "voc-seisai-design",
            label: "星彩デザイン専門学校",
            tag: "美術・デザイン",
            blurb: "ポートフォリオが教科書。見せ方が仕事になる",
            require: { skill: 15, calm: 13 },
            scenes: schoolQuest(
              "星彩デザイン専門学校",
              "壁一面に、先輩の作品が並んでいる。",
              {
                label: "課題を量産して型を覚える",
                title: "上手い下手は、すぐに画面に出る。",
                body: "フィードバックの速さが、成長を加速する。",
                ending: "好きが、提出物の習慣に変わった。"
              },
              {
                label: "コンペに出してみる",
                title: "審査の一言が、次の一作を変える。",
                body: "外の目に晒す勇気が、技術を一段上げる。",
                ending: "デザインは、伝えるための技術だと分かった。"
              },
              "skill"
            )
          },
          {
            id: "voc-sokai-trainer",
            label: "蒼海スポーツ専門学校",
            tag: "スポーツ",
            blurb: "競技とトレーナー。身体の使い方を仕事にする",
            require: { stamina: 16, social: 12, courage: 12 },
            scenes: schoolQuest(
              "蒼海スポーツ専門学校",
              "朝練の汗が、教室の机にも残っている。",
              {
                label: "現場実習を増やす",
                title: "支える側に回ると、試合の見え方が変わる。",
                body: "声かけ一つで、選手の表情が変わる。",
                ending: "体力と社交が、同じ現場で育った。"
              },
              {
                label: "資格取得を軸にする",
                title: "数字と記録が、感覚を言葉にする。",
                body: "根拠のあるアドバイスが、信頼につながる。",
                ending: "スポーツの出口は、選手だけじゃないと知った。"
              },
              "skill"
            )
          },
          {
            id: "voc-business",
            label: "ビジネストラベル専門学校",
            tag: "ビジネス・観光",
            blurb: "接客と企画。人と場を動かす実務を学ぶ",
            require: { social: 15, calm: 12 },
            scenes: schoolQuest(
              "ビジネストラベル専門学校",
              "ロールプレイの声が、廊下まで明るい。",
              {
                label: "接客実習を積み上げる",
                title: "相手の表情が、いちばん速い教材だった。",
                body: "正解より、その場での判断力が残る。",
                ending: "社交は才能より、回数で伸びると実感した。"
              },
              {
                label: "イベント運営に入る",
                title: "裏方の段取りが、表の笑顔をつくる。",
                body: "人と場所を動かす感覚が、仕事の原型になる。",
                ending: "観光もビジネスも、結局は人だった。"
              },
              "skill"
            )
          },
          {
            id: "voc-care",
            label: "メディカルケア専門学校",
            tag: "医療・福祉",
            blurb: "支える技術。冷静さと継続が武器になる",
            require: { calm: 15, intellect: 13, stamina: 12 },
            scenes: schoolQuest(
              "メディカルケア専門学校",
              "白衣のポケットに、メモと優しさが同居する。",
              {
                label: "実習で現場の空気を知る",
                title: "教科書では分からない緊張がある。",
                body: "冷静さは、冷ややかさじゃなく、相手を守る力だ。",
                ending: "支える仕事の重みと、やりがいが同時に残った。"
              },
              {
                label: "基礎を丁寧に固める",
                title: "ミスの少なさが、信頼になる。",
                body: "派手さより、続く正確さが評価される。",
                ending: "技術と冷静さが、同じ白衣の中で育った。"
              },
              "skill"
            )
          }
        ]
      },
      {
        id: "startup",
        label: "自分で会社をつくる",
        short: "起業",
        hint: "ゼロから始める高揚と、空白の重さを試す",
        branchTitle: "どこから起業を試す？",
        branchNote: "入口の違いを選んでQUESTへ",
        theme: "startup",
        img: "assets/char-creator.png",
        speaker: "創業者",
        x: 78,
        y: 36,
        options: [
          {
            id: "start-sell",
            label: "まず一人に売ってみる",
            tag: "販売",
            blurb: "顧客の声から始める起業",
            scenes: simpleQuest(
              "起業（販売）",
              "屋号は決めた。まだ、客はいない。",
              "自由は大きい。空白を自分で埋めなければならない。",
              {
                label: "まず一人に売ってみる",
                title: "最初の一人は、想像より遠い。",
                body: "断られるたびに、仮説が削れる。一度「欲しい」で世界が変わる。",
                nextLabel: "その声を手がかりに改良する"
              },
              {
                label: "売る相手を変えて探る",
                title: "市場を歩くと、想定が崩れる。",
                body: "つくりたいものより、誰の困りごとかが先に立つ。",
                nextLabel: "誰に届けるかを再定義する"
              },
              {
                title: "つくる自由の裏に、引き受ける孤独がある。",
                body: "起業は夢の言い換えじゃない。仮説を現実に擦りつづける仕事だ。",
                reality: [
                  { label: "起業イベントを調べる", href: "#reality-event" },
                  { label: "学生向け事業体験を探す", href: "#reality-work" }
                ]
              },
              {
                title: "「つくりたいもの」より「誰の困りごとか」が先に立った。",
                body: "起業の入口は、才能の証明より観察に近い。",
                reality: [
                  { label: "地域や業界の課題イベントへ", href: "#reality-event" },
                  { label: "創業支援窓口を調べる", href: "#reality-work" }
                ]
              }
            )
          },
          {
            id: "start-team",
            label: "先に仲間を集める",
            tag: "チーム",
            blurb: "一緒に走る人から始める起業",
            scenes: simpleQuest(
              "起業（チーム）",
              "一人では見えなかった穴が、会話で見つかる。",
              "速度と摩擦が、同時に来る。",
              {
                label: "役割を分けて小さく出す",
                title: "リリースの瞬間、空気が変わる。",
                body: "完成度より、届いたかどうかが問いになる。",
                nextLabel: "その声を手がかりに改良する"
              },
              {
                label: "価値観のすり合わせを先にする",
                title: "話すほど、進む方向がはっきりする。",
                body: "仲間は加速装置で、同時に鏡でもある。",
                nextLabel: "誰に届けるかを再定義する"
              },
              {
                title: "つくる自由の裏に、引き受ける孤独がある。",
                body: "チームでも、最後に引き受ける感覚は残る。",
                reality: [
                  { label: "起業イベントを調べる", href: "#reality-event" },
                  { label: "学生向け事業体験を探す", href: "#reality-work" }
                ]
              },
              {
                title: "「つくりたいもの」より「誰の困りごとか」が先に立った。",
                body: "仲間と見る世界は、一人の想像より広い。",
                reality: [
                  { label: "地域や業界の課題イベントへ", href: "#reality-event" },
                  { label: "創業支援窓口を調べる", href: "#reality-work" }
                ]
              }
            )
          }
        ]
      }
    ]
  };
})();
