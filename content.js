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

  // 大きなイベントは少なめ。間に「日常」を挟んでテンポを落とす
  function homeMadeEventQuest() {
    return {
      start: {
        kicker: "QUEST / 株式会社綿伴ホームメイド",
        title: "入社一年目。売場には、まだ知らない仕事がたくさんある。",
        body: "商品を並べる人、仕入れる人、届ける人。\n一つのお店の中で、いくつもの人生が動いている。",
        choices: [
          { label: "まずは売場の仕事を覚える", next: "ordinary-days" },
          { label: "休憩時間に、他部署の人と話す", next: "ordinary-days" }
        ]
      },
      "ordinary-days": {
        speaker: "先輩・桐谷",
        img: "assets/char-office.jpg",
        kicker: "いつもの一日",
        title: "特別なことは起きない。でも、毎日が少しずつ上手くなる。",
        body: "朝の陳列、お客様対応、夕方の棚直し。\n慣れてきた頃、店長が声をかけてきた。",
        choices: [
          { label: "話を聞く", next: "project-invite" }
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
        img: "assets/char-office.jpg",
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
        img: "assets/char-campus.jpg",
        kicker: "数日後",
        title: "休憩室で、美原商店の担当・陽菜と顔を合わせる。",
        body: "「このお店で、どんなお茶なら手に取ってもらえると思う？」\n仕事の相談から始まって、好きな食べ物の話まで広がった。",
        choices: [
          { label: "企画の話を続ける", next: "planning-weeks" },
          { label: "また今度、ゆっくり話そうと伝える", next: "planning-weeks" }
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
        img: "assets/char-campus.jpg",
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
          text: "陽菜から「今度、お茶のお店を見に行かない？」と連絡が届いた。"
        },
        speaker: "陽菜",
        img: "assets/char-campus.jpg",
        kicker: "関係イベント",
        title: "これは仕事の続き？ それとも、少し違う時間？",
        body: "一緒にいると、仕事の相談より未来の話が増えていく。\n急がなくていい。でも、答えを出す日は近づいている。",
        choices: [
          { label: "楽しみにしてる、と返す", next: "one-year-later" },
          { label: "企画が一段落してからにしよう、と返す", next: "one-year-later" }
        ]
      },
      "one-year-later": {
        speaker: "店長・桐谷",
        img: "assets/char-office.jpg",
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
        img: "assets/char-campus.jpg",
        kicker: "人生の分岐点",
        title: "「一緒に長野へ来てほしい。でも、あなたの仕事も大切にしてほしい」",
        body: "結婚、仕事、移住。\nどれか一つではなく、いくつもの選択が同時に目の前へ来た。",
        choices: [
          { label: "結婚して、一緒に長野へ行く", next: "end-together" },
          { label: "今の仕事を続け、遠距離を選ぶ", next: "end-distance" },
          { label: "まず自分のキャリアを優先する", next: "end-career" }
        ]
      },
      "end-together": {
        ending: true,
        kicker: "この人生の感触",
        title: "仕事から始まった出会いが、暮らす場所まで変えた。",
        body: "長野で新しい売場を立ち上げながら、二人の暮らしを始めた。\n正解だからではなく、二人で確かめて選んだ人生だ。",
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

  window.LIFE_QUEST = {
    categories: [
      {
        id: "work",
        label: "企業で働く",
        short: "企業",
        hint: "まずは「働く」を選ぶ。次に会社を選ぶ",
        branchTitle: "どの会社で試す？",
        branchNote: "グループ会社を選んでQUESTへ（社名はかわいくデフォルメしたデモ用）",
        theme: "bigco",
        img: "assets/char-office.jpg",
        speaker: "先輩社員",
        x: 22,
        y: 30,
        options: [
          {
            id: "co-homeaid",
            label: "株式会社綿伴ホームメイド",
            tag: "小売",
            blurb: "おうちの「あったら便利」が並ぶお店の運営",
            scenes: homeMadeEventQuest()
          },
          {
            id: "co-solutions",
            label: "綿伴ソウリューションズ株式会社",
            tag: "建築・設備",
            blurb: "建物や設備の「困った」をいっしょに片づける",
            scenes: companyQuest("綿伴ソウリューションズ株式会社", "現場の安全と納期が、毎日の会話の中心にある。")
          },
          {
            id: "co-mihara",
            label: "株式会社綿伴美原商店",
            tag: "食品・茶",
            blurb: "お茶とおかし、カフェのやさしい香り",
            scenes: companyQuest("株式会社綿伴美原商店", "香りと味の現場。お客様の「おいしい」が近い。")
          },
          {
            id: "co-house",
            label: "株式会社綿伴林郷の家",
            tag: "住宅",
            blurb: "木のぬくもりで、おうちをつくる",
            scenes: companyQuest("株式会社綿伴林郷の家", "図面と会話が行き来する。家は、人の時間を入れる器だ。")
          },
          {
            id: "co-kids",
            label: "株式会社綿伴キッズスクエール",
            tag: "教育",
            blurb: "学びとあそびがとなり同士の場所",
            scenes: companyQuest("株式会社綿伴キッズスクエール", "子どもの声が職場のBGMになる。成長が近い仕事だ。")
          },
          {
            id: "co-partners",
            label: "綿伴ハートナーズ株式会社",
            tag: "仕入・物流",
            blurb: "お店の裏側を、みんなで支える",
            scenes: companyQuest("綿伴ハートナーズ株式会社", "倉庫と数字が一日の主役。店の裏側を動かす仕事だ。")
          },
          {
            id: "co-taiyo",
            label: "太平洋株式会社",
            tag: "家具製造",
            blurb: "部品が、ぴたっと家具になる現場",
            scenes: companyQuest("太平洋株式会社", "部品が家具になる工程が、目の前で進んでいく。")
          },
          {
            id: "co-ligna",
            label: "リグナチュラ株式会社",
            tag: "インテリア",
            blurb: "おうちの景色を、やさしく整える",
            scenes: companyQuest("リグナチュラ株式会社", "画面の商品が、部屋の景色に変わる瞬間を扱う仕事だ。")
          },
          {
            id: "co-dotcom",
            label: "株式会社綿伴ドアットコム",
            tag: "通販",
            blurb: "ほしいもの届ける、画面の向こうの店舗",
            scenes: companyQuest("株式会社綿伴ドアットコム", "注文が入るたびに、倉庫と画面が同時に忙しくなる。")
          },
          {
            id: "co-house-fc",
            label: "株式会社綿伴林業SHINE",
            tag: "住宅FC",
            blurb: "家づくりのお店を、後ろから応援する",
            scenes: companyQuest("株式会社綿伴林業SHINE", "加盟店の悩みと、家づくりの技術が同じ机に乗る。")
          },
          {
            id: "co-trading",
            label: "綿伴トレジャーディング株式会社",
            tag: "原料・輸入",
            blurb: "世界のよい素材を、ていねいに運ぶ",
            scenes: companyQuest("綿伴トレジャーディング株式会社", "世界の原料が、規格と信頼で日本の現場へ届く。")
          },
          {
            id: "co-kenzai",
            label: "綿伴健材株式会社",
            tag: "建材",
            blurb: "家の骨組みを、木と資材で支える",
            scenes: companyQuest("綿伴健材株式会社", "資材の名前と、届ける先の顔がセットで覚えられていく。")
          },
          {
            id: "co-woodpower",
            label: "綿伴ウッドフラワー株式会社",
            tag: "エネルギー",
            blurb: "木の力で、あかりをつくる",
            scenes: companyQuest("綿伴ウッドフラワー株式会社", "木がエネルギーに変わる現場。数字と安全が隣り合う。")
          },
          {
            id: "co-realestate",
            label: "綿伴レアルエステート株式会社",
            tag: "不動産",
            blurb: "「ここに住みたい」をいっしょに探す",
            scenes: companyQuest("綿伴レアルエステート株式会社", "物件は数字だけじゃない。住む人の一日が乗っている。")
          },
          {
            id: "co-intec",
            label: "株式会社綿伴インテクト",
            tag: "レンタル・物流",
            blurb: "必要なものを、必要なときに届ける",
            scenes: companyQuest("株式会社綿伴インテクト", "必要なものが、必要な場所へ届く。段取りが腕になる。")
          },
          {
            id: "co-farm",
            label: "綿伴ファームフル株式会社",
            tag: "畜産",
            blurb: "生き物の一日に合わせる仕事",
            scenes: companyQuest("綿伴ファームフル株式会社", "生き物のリズムに合わせて、一日が始まる。")
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
        img: "assets/char-campus.jpg",
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
        hint: "学びの四年を、目的のある時間に変える",
        branchTitle: "どんな学び方を試す？",
        branchNote: "進学の向きを選んでQUESTへ",
        theme: "univ",
        img: "assets/char-campus.jpg",
        speaker: "先輩学生",
        x: 28,
        y: 62,
        options: [
          {
            id: "univ-deep",
            label: "研究・専門を深める",
            tag: "研究",
            blurb: "一つの問いを長く追う四年",
            scenes: simpleQuest(
              "大学（研究）",
              "キャンパスは広い。時間割より、余白が多い。",
              "講義、ゼミ、図書館。何を選んでも四年は進む。",
              {
                label: "研究室やゼミで深く学ぶ",
                title: "一つの問いを追い続けると、世界が細かく見える。",
                body: "すぐに就活の話にはならない。でも、「考える筋力」がつく。",
                nextLabel: "この分野で大学院も視野に入れる"
              },
              {
                label: "学外のプロジェクトにも出る",
                title: "学外は、フィードバックが早い。",
                body: "大学は拠点で、学びの現場は外にもある。",
                nextLabel: "実践を軸に進路を探す"
              },
              {
                title: "大学は、答えより問いを増やす場所だった。",
                body: "「とりあえず進学」ではなく、「何を問い続けたいか」が見えると四年の意味が変わる。",
                reality: [
                  { label: "オープンキャンパスを調べる", href: "#reality-campus" },
                  { label: "体験授業を探す", href: "#reality-class" }
                ]
              },
              {
                title: "学ぶことと、社会側の動きがつながった。",
                body: "大学は閉じた四年じゃない。外と往復できる時間でもある。",
                reality: [
                  { label: "気になる大学の学びを知る", href: "#reality-campus" },
                  { label: "学生プロジェクト事例を見る", href: "#reality-class" }
                ]
              }
            )
          },
          {
            id: "univ-practice",
            label: "実践・社会接続を増やす",
            tag: "実践",
            blurb: "キャンパスを拠点に外へ出る四年",
            scenes: simpleQuest(
              "大学（実践）",
              "授業のあいだに、学外の予定が埋まっていく。",
              "インターン、イベント、地域活動。大学は基地になる。",
              {
                label: "インターンを軸にする",
                title: "現場の言葉は、教科書より早い。",
                body: "失敗も、次の授業の問いになる。",
                nextLabel: "実践を軸に進路を探す"
              },
              {
                label: "学内の活動を育てる",
                title: "仲間と企画を通す経験が残った。",
                body: "単位とは別の、動かし方の筋肉がつく。",
                nextLabel: "この分野で大学院も視野に入れる"
              },
              {
                title: "学ぶことと、社会側の動きがつながった。",
                body: "大学は閉じた四年じゃない。外と往復できる時間でもある。",
                reality: [
                  { label: "気になる大学の学びを知る", href: "#reality-campus" },
                  { label: "学生プロジェクト事例を見る", href: "#reality-class" }
                ]
              },
              {
                title: "大学は、答えより問いを増やす場所だった。",
                body: "実践のあとで研究に戻ると、問いの質が変わる。",
                reality: [
                  { label: "オープンキャンパスを調べる", href: "#reality-campus" },
                  { label: "体験授業を探す", href: "#reality-class" }
                ]
              }
            )
          }
        ]
      },
      {
        id: "skill",
        label: "専門技術を身につける",
        short: "専門",
        hint: "手に職の感触を、短い訓練で確かめる",
        branchTitle: "どの技術に触れる？",
        branchNote: "気になる分野を選んでQUESTへ",
        theme: "skill",
        img: "assets/char-creator.jpg",
        speaker: "技術者",
        x: 52,
        y: 22,
        options: [
          {
            id: "skill-craft",
            label: "制作・クラフト系",
            tag: "制作",
            blurb: "手を動かして形にする技術",
            scenes: simpleQuest(
              "専門（制作）",
              "座学より先に、道具が渡される。",
              "上手い下手は、すぐに作品に出る。",
              {
                label: "基礎を反復して型を入れる",
                title: "地味な反復のあと、手が勝手に動く瞬間が来る。",
                body: "才能の話より、時間の使い方の話になる。",
                nextLabel: "資格や到達点で確認する"
              },
              {
                label: "作品を作って外に出す",
                title: "公開した作品に、想定外の反応が来る。",
                body: "技術は、誰かとの接点で磨かれる。",
                nextLabel: "現場の課題で腕を試す"
              },
              {
                title: "技術は、自信を「感覚」から「根拠」に変える。",
                body: "専門性は進路を狭めるためじゃない。選べる幅を増やすためにある。",
                reality: [
                  { label: "専門学校の体験授業を探す", href: "#reality-class" },
                  { label: "技術職の職場見学を調べる", href: "#reality-work" }
                ]
              },
              {
                title: "作ったものが、誰かの役に立つ瞬間が残った。",
                body: "上手くなることだけじゃない。届く相手が見えることにある。",
                reality: [
                  { label: "制作系のオープンキャンパスへ", href: "#reality-campus" },
                  { label: "現場体験の機会を探す", href: "#reality-work" }
                ]
              }
            )
          },
          {
            id: "skill-it",
            label: "デジタル・IT系",
            tag: "IT",
            blurb: "画面の向こうに届く技術",
            scenes: simpleQuest(
              "専門（IT）",
              "黒い画面に、最初の一行を打つ。",
              "動いた瞬間の快感と、動かない時間の長さがセットで来る。",
              {
                label: "基礎から丁寧に積む",
                title: "エラーの読み方が、少しずつ分かる。",
                body: "遠回りに見えて、いちばん速い道だったりする。",
                nextLabel: "資格や到達点で確認する"
              },
              {
                label: "小さなサービスを公開する",
                title: "使った人の反応が、次の課題になる。",
                body: "コードは孤独な作業に見えて、実は対話だ。",
                nextLabel: "現場の課題で腕を試す"
              },
              {
                title: "技術は、自信を「感覚」から「根拠」に変える。",
                body: "専門性は進路を狭めるためじゃない。選べる幅を増やすためにある。",
                reality: [
                  { label: "専門学校の体験授業を探す", href: "#reality-class" },
                  { label: "技術職の職場見学を調べる", href: "#reality-work" }
                ]
              },
              {
                title: "作ったものが、誰かの役に立つ瞬間が残った。",
                body: "動くものには、必ず誰かの時間が乗っている。",
                reality: [
                  { label: "IT系のオープンキャンパスへ", href: "#reality-campus" },
                  { label: "現場体験の機会を探す", href: "#reality-work" }
                ]
              }
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
        img: "assets/char-creator.jpg",
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
