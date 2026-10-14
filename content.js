(() => {
  function companyQuest(name, flavor) {
    return {
      start: {
        kicker: `QUEST / ${name}`,
        title: "現場の空気、すぐ肌にくる。",
        body: `${flavor}\n名刺の社名より先に、「今日なにやる？」が会話になる。`,
        choices: [
          { label: "まずは目の前の仕事、確実に", next: "steady" },
          { label: "周りの部署や店舗、見て回る", next: "look" }
        ]
      },
      steady: {
        kicker: "選択のあと",
        title: "できること増えるほど、任せられる範囲も広がった。",
        body: `「${name}っぽさ」って、スローガンより日々の積み重ねで見えてくる。\n自分の適性も、少しずつ輪郭が出てきた。`,
        choices: [
          { label: "現場のプロとして深掘りする", next: "end-craft" },
          { label: "新しい企画や改善に手を挙げる", next: "end-challenge" }
        ]
      },
      look: {
        kicker: "選択のあと",
        title: "同じ会社でも、場所が違えば景色が違う。",
        body: "売場、倉庫、事務所、お客様対応。\n一つの会社の中に、いくつもの働き方が入ってる。",
        choices: [
          { label: "お客様に近い仕事を選ぶ", next: "end-craft" },
          { label: "仕組みづくり側に関わってみる", next: "end-challenge" }
        ]
      },
      "end-craft": {
        ending: true,
        kicker: "この人生の感触",
        title: "続く仕事の感触が、残った。",
        body: "派手さより、毎日の積み重ね。\n気になるなら、本物の職場で温度を確かめてみて。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-challenge": {
        ending: true,
        kicker: "この人生の感触",
        title: "小さな改善、動かせた。",
        body: "会社はひとつでも、挑戦の入口はいくつもある。\n「ここで試したい」が残るなら、現実の接点へ進もう。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
        ]
      }
    };
  }

  // 各社QUESTは単独完結。他社連携・恋バナなし。背景も自社画像のみ。
  function homeMadeEventQuest() {
    const name = "株式会社綿伴ホームメイド";
    const senior = "assets/char-homeaid-apron-man.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-homeaid-exterior.jpg",
        kicker: `QUEST / ${name}`,
        title: "……よし、今日も開店だ。",
        body: "並べる人、案内する人、届ける人。\nお店の中って、思ってたより人が動いてる。",
        choices: [
          { label: "通路の売場から覚える", next: "ordinary-days" },
          { label: "生鮮コーナーをのぞいてみる", next: "seafood" }
        ]
      },
      "ordinary-days": {
        bg: "assets/backgrounds/bg-homeaid-aisle.jpg",
        speaker: "先輩・桐谷",
        img: senior,
        kicker: "いつもの一日",
        title: "「派手な日なんて、ほとんどないぞ」",
        body: "「でもな、昨日より棚がきれいだと、ちゃんと気持ちいい。\n……おっと、店長が呼んでる。こっち来い」",
        choices: [
          { label: "「はい！」とついていく", next: "season-fest" }
        ]
      },
      seafood: {
        bg: "assets/backgrounds/bg-homeaid-seafood.jpg",
        speaker: "先輩・桐谷",
        img: senior,
        kicker: "生鮮",
        title: "「止まるとこ、分かるだろ？ 水槽の前だ」",
        body: "「鮮度は説明より、見せ方が九割。\n……店長が呼んでる。話があるってさ」",
        choices: [
          { label: "「分かりました」とついていく", next: "season-fest" }
        ]
      },
      "season-fest": {
        bg: "assets/backgrounds/bg-homeaid-produce.jpg",
        speaker: "先輩・桐谷",
        img: senior,
        kicker: "季節の売場",
        title: "「旬の色、ちゃんと出てる？」",
        body: "「気合じゃなくて段取りだ。誰が補充して、誰が声をかけるか。\n去年よりうまくやるなら、そこからだ」",
        choices: [
          { label: "「青果、並べ替えます」", next: "project-invite" },
          { label: "「通路の流れ、見てみます」", next: "project-invite" }
        ]
      },
      "project-invite": {
        event: {
          label: "WORK EVENT",
          icon: "✦",
          title: "売場改善への招待",
          text: "季節売場の見直しが始まる。先輩から『一緒にやってみない？』と声がかかった。"
        },
        speaker: "先輩・桐谷",
        img: senior,
        kicker: "仕事イベント",
        title: "「君も、この売場づくりに入ってみない？」",
        body: "「経験はね、あとからついてくる。\nお客様の近くにいる目線が、いま欲しいんだよ」",
        choices: [
          { label: "「やってみます！」", next: "floor-work" },
          { label: "「……少し、考えてもいいですか」", next: "floor-work" }
        ]
      },
      "floor-work": {
        bg: "assets/backgrounds/bg-homeaid-aisle.jpg",
        speaker: "売場スタッフ・葵",
        img: "assets/char-homeaid-woman.png",
        kicker: "売場づくり",
        title: "「ねえ、ここ迷わない？ わたしは迷う」",
        body: "「手、届きやすい棚って絶対あるの。\nそういう『現場の感覚』、メモしとこうよ」",
        choices: [
          { label: "「別コーナーも見てみる？」", next: "pet-corner" },
          { label: "「いったん、案にまとめよう」", next: "proposal" }
        ]
      },
      "pet-corner": {
        bg: "assets/backgrounds/bg-homeaid-pet.jpg",
        speaker: "売場スタッフ・葵",
        img: "assets/char-homeaid-woman.png",
        kicker: "専門売場",
        title: "「ここ、長居する人多いよね」",
        body: "「通路と全然ちがう。同じ店なのに、空気が別物。\n……だから、全部同じ型じゃ無理なんだよ」",
        choices: [
          { label: "「じゃあ、提案に落とそう」", next: "proposal" }
        ]
      },
      proposal: {
        bg: "assets/backgrounds/bg-homeaid-aisle.jpg",
        speaker: "先輩・桐谷",
        img: senior,
        kicker: "提案のあと",
        title: "「最初の案、通らなかったな」",
        body: "「落ち込まなくていい。宿題ははっきりした。\n数字と現場感、どっちもいるってことだ」",
        choices: [
          { label: "「練り直します」", next: "quiet-months" },
          { label: "「もう一回、店の声集めます」", next: "quiet-months" }
        ]
      },
      "quiet-months": {
        bg: "assets/backgrounds/bg-homeaid-produce.jpg",
        kicker: "季節がひとつ進む",
        title: "……なんか、前より歩きやすい。",
        body: "派手なことは起きてない。\nでも補充のリズムが、ちゃんと噛み合ってきた気がする。",
        choices: [
          { label: "一年後の話を聞いてみる", next: "one-year-later" }
        ]
      },
      "one-year-later": {
        bg: "assets/backgrounds/bg-homeaid-seafood.jpg",
        speaker: "店長・桐谷",
        img: senior,
        kicker: "約一年後",
        title: "「お前、仕事の幅、広がったな」",
        body: "「売場は形になってきた。次の役割の話も出てる。\nここで深掘るか、仕組み側に行くか——選べるぞ」",
        choices: [
          { label: "「売場で、もっと上手くなりたいです」", next: "end-craft" },
          { label: "「改善とか、仕組みも見てみたいです」", next: "end-challenge" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-homeaid-aisle.jpg",
        kicker: "この人生の感触",
        title: "続く仕事って、こういう感触かも。",
        body: "派手さより、昨日よりきれいな棚。\nそれがいちばん、自分に合ってた。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-challenge": {
        ending: true,
        bg: "assets/backgrounds/bg-homeaid-produce.jpg",
        kicker: "この人生の感触",
        title: "小さな改善、動かせた。",
        body: "会社はひとつでも、入口はいくつもある。\n『次も試したい』が、ちゃんと残った。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
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
        title: "安全と納期——現場の会話は、だいたいここから。",
        body: "『困った』を片づける仕事。鉄も木も、図面の先に一日がある。\n今日は、工場と現場、どっちから触る？",
        choices: [
          { label: "鉄骨・溶接の工場を見る", next: "steel" },
          { label: "木造倉庫の現場に出る", next: "warehouse" },
          { label: "先輩の出張に着いていく", next: "trip" }
        ]
      },
      steel: {
        bg: "assets/backgrounds/bg-solution-steel-beams.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "鉄骨",
        title: "「この柱が、建物の骨になる」",
        body: "「オレンジの接手、ボルト穴の並び。\n重いほど、ミスは許されないぞ」",
        choices: [
          { label: "「ロボット溶接、見たいです」", next: "robot" },
          { label: "「火花の作業場も見たいです」", next: "spark" }
        ]
      },
      robot: {
        bg: "assets/backgrounds/bg-solution-robot-weld.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "自動化",
        title: "「腕は人じゃない。でも、判断は人だ」",
        body: "「アークの青白い光が、継ぎ目を決める。\nプログラムも、現場の感覚も、両方いる」",
        choices: [
          { label: "「溶接ライン、歩いてみます」", next: "weld-line" },
          { label: "「建設現場の姿も見たい」", next: "construction" }
        ]
      },
      "weld-line": {
        bg: "assets/backgrounds/bg-solution-weld-line.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "溶接ライン",
        title: "「黄色い腕が、梁を回しながらつなぐ」",
        body: "「カーテンの向こうは、光の仕事場だ。\n安全も品質も、段取りの延長線にある」",
        choices: [
          { label: "「火花の手元、もう少し」", next: "spark" },
          { label: "「建ち上がる現場へ」", next: "construction" }
        ]
      },
      spark: {
        bg: "assets/backgrounds/bg-solution-spark-shop.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "加工",
        title: "「火花は派手だが、中身は地味な確認の連続だ」",
        body: "「治具、フック、板の置き場。\n人がいなくても、仕事の温度は分かるだろ」",
        choices: [
          { label: "「建設現場も見てみたい」", next: "construction" },
          { label: "「立駐の話も聞きたいです」", next: "snow" }
        ]
      },
      construction: {
        bg: "assets/backgrounds/bg-solution-construction.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "建設",
        title: "「工場の梁が、空に立つ」",
        body: "「ネット、クレーン、鋼の格子。\n図面の線が、街の景色になる瞬間だ」",
        choices: [
          { label: "「倉庫現場も見ておきたい」", next: "warehouse" },
          { label: "「出張の流れも知りたい」", next: "trip" }
        ]
      },
      warehouse: {
        bg: "assets/backgrounds/bg-solution-warehouse.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "木造倉庫の現場",
        title: "「寸法、合ってるか。匂い、分かるだろ」",
        body: "「安全、寸法、搬入経路。この三つが口癖になる。\n建てると収めるは、セットだぞ」",
        choices: [
          { label: "「雪国の立駐、見たいです」", next: "snow" },
          { label: "「沿岸の立駐、見たいです」", next: "resilient" },
          { label: "「鉄骨工場も見ておきたい」", next: "steel" }
        ]
      },
      snow: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "雪対策",
        title: "「止めやすい、だけじゃ足りない」",
        body: "「融雪、足元、風雪。止められるってのは、天気の設計でもある。\n……行くぞ、次」",
        choices: [
          { label: "「融雪、見せてください」", next: "trip" },
          { label: "「柱の広さ、体感したいです」", next: "trip" }
        ]
      },
      resilient: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "備えの設計",
        title: "「もしもの水、想定してるか？」",
        body: "「大事な盤は上。屋根は太陽光。\n安心の順番が、図面の順番だ」",
        choices: [
          { label: "「電気の配置、確認します」", next: "trip" },
          { label: "「屋根のパネル、見上げます」", next: "trip" }
        ]
      },
      trip: {
        event: {
          label: "WORK EVENT",
          icon: "✈",
          title: "海外出張の同行",
          text: "部品調達の打ち合わせ。初めての海外出張に、先輩が連れていくと言う。"
        },
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "仕事イベント",
        title: "「車は空港の立駐に停めて、そこから飛ぶぞ」",
        body: "「出張の始まりは、意外と足元だ。\nうちが手がけた立駐が、今日の出発点だ」",
        choices: [
          { label: "「分かりました、向かいます」", next: "parking" }
        ]
      },
      parking: {
        bg: "assets/backgrounds/bg-solution-parking.jpg",
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "空港の立体駐車場",
        title: "「階段上がりながら、思い出してる」",
        body: "「お前が関わった案件かは、まだ分からんだろ。\nでもな、『止められる場所』が旅の入口になってる」",
        choices: [
          { label: "「ゲート、行きましょう」", next: "abroad" },
          { label: "「一枚、撮ってもいいですか」", next: "abroad" }
        ]
      },
      abroad: {
        speaker: "先輩・黒瀬",
        img: senior,
        kicker: "出張のあと",
        title: "「会議室でも、戻る場所の話が出る」",
        body: "「仕様、納期、安全。\n帰り道はまた、あの立駐のコンクリートからだ」",
        choices: [
          { label: "「現場・製造、もっとやりたいです」", next: "end-craft" },
          { label: "「調達や計画も見てみたいです」", next: "end-plan" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-solution-robot-weld.jpg",
        kicker: "この人生の感触",
        title: "鉄をつなぎ、場をつくる仕事が残った。",
        body: "火花もクレーンも、安全の延長線。\n派手さより、毎日の積み重ねだ。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-plan": {
        ending: true,
        bg: "assets/backgrounds/bg-solution-construction.jpg",
        kicker: "この人生の感触",
        title: "現場と計画、両方見えるようになった。",
        body: "納期と安全は、机の上だけじゃ決まらない。\n工場の梁が、空に立つまでが仕事だ。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function houseLinkedQuest() {
    const name = "株式会社綿伴林郷の家";
    return {
      start: {
        bg: "assets/backgrounds/bg-shine-living-stove.jpg",
        kicker: `QUEST / ${name}`,
        title: "図面の線より、先に会話が来る。",
        body: "『朝の光がほしい』って言葉が、\nいつの間にか寸法になって戻ってくる。",
        choices: [
          { label: "モデルハウスの案内についていく", next: "model" },
          { label: "お客様の打ち合わせに同席する", next: "client" }
        ]
      },
      model: {
        bg: "assets/backgrounds/bg-shine-dining-kitchen.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "モデルハウス",
        title: "「ここ、ソファ置いたら朝きれいだと思わない？」",
        body: "「階段の手触りもね。カタログより、触った感のほうが大事。\n『住む』って言葉、一緒に探していこう」",
        choices: [
          { label: "「疲れがほどける家、案内してみます」", next: "recover" },
          { label: "「間取りから、ちゃんと説明します」", next: "refine" }
        ]
      },
      recover: {
        bg: "assets/backgrounds/bg-shine-washitsu.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "展示場",
        title: "「動線が短いとね、夜の自分が助かるの」",
        body: "「木の手触り、光、静けさ——休み方って間取りに入ってる。\n『住む』は、回復の設計でもあるよ」",
        choices: [
          { label: "「お客様に、体感してもらおう」", next: "client" },
          { label: "「要望、図面に落とします」", next: "refine" }
        ]
      },
      client: {
        bg: "assets/backgrounds/bg-shine-mezzanine.jpg",
        speaker: "お客様",
        img: "assets/char-customer-woman.png",
        kicker: "打ち合わせ",
        title: "「明かりがたくさん入ってくる感じがいいわ」",
        body: "「朝、窓のところに座れたら最高。\nあと廊下、すれ違えるくらいあると助かるんだけど」",
        choices: [
          { label: "「窓と廊下、図面に入れますね」", next: "refine" }
        ]
      },
      refine: {
        bg: "assets/backgrounds/bg-shine-dining-kitchen.jpg",
        speaker: "先輩・結城",
        img: "assets/char-office.png",
        kicker: "設計のあと",
        title: "「一発で決めなくていいよ」",
        body: "「話し合いの回数のほうが、正直大事。\n家づくりって、会話の仕事でもあるから」",
        choices: [
          { label: "「設計、もっと深くやりたいです」", next: "end-craft" },
          { label: "「お客様との話し方、学びたいです」", next: "end-client" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-shine-living-stove.jpg",
        kicker: "この人生の感触",
        title: "図面の向こうに、人の一日が見えた。",
        body: "線の一本が、朝の光になる。\nその感覚が、残った。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-client": {
        ending: true,
        bg: "assets/backgrounds/bg-shine-washitsu.jpg",
        kicker: "この人生の感触",
        title: "『いいわ』を言葉にできた。",
        body: "家は物でも、渡してるのは安心と想像。\n聞く力が、いちばんの道具になった。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
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
        title: "画面の商品が、部屋の景色に変わる日。",
        body: "おうちの景色、やさしく整える仕事。\n店頭も提案も、同じ一日に並ぶ。",
        choices: [
          { label: "店内のコーディネートを見る", next: "shop" },
          { label: "お客様の図面、一緒に見る", next: "plan" }
        ]
      },
      shop: {
        bg: "assets/backgrounds/bg-rigna-showroom.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "ショールーム",
        title: "「ここにテーブル置いたら、朝きれいでしょ」",
        body: "「ソファ、照明、ラグ——商品の話してるつもりが、\nいつの間にか暮らしの話になってるの」",
        choices: [
          { label: "「リビングの一角、もっと見たい」", next: "living" },
          { label: "「提案、仕上げにいこう」", next: "finish" }
        ]
      },
      living: {
        bg: "assets/backgrounds/bg-rigna-living-rem.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "リビング",
        title: "「色と素材が合うと、空気が一段静かになる」",
        body: "「革のあたたかさ、木目のテーブル、壁のグレー。\n組み合わせが、部屋の性格になるんだよ」",
        choices: [
          { label: "「レンガ壁のコーナーも見たい」", next: "brick" },
          { label: "「サイドボード周りも」", next: "sideboard" }
        ]
      },
      brick: {
        bg: "assets/backgrounds/bg-rigna-living-brick.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "空間",
        title: "「工業っぽさと、ぬくもり——両方ほしい人、多い」",
        body: "「フレームの黒、木の天板、グリーン。\nときどきときめく空間って、こういうバランス」",
        choices: [
          { label: "「LDKの提案例も見せて」", next: "ldk" },
          { label: "「仕上げに入ろう」", next: "finish" }
        ]
      },
      sideboard: {
        bg: "assets/backgrounds/bg-rigna-sideboard.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "家具",
        title: "「一点でも、部屋の軸になる家具がある」",
        body: "「取っ手のない木目、余白の枝、小さな絵。\n静かなくせに、視線はちゃんと止まるでしょ」",
        choices: [
          { label: "「LDKの提案例も見せて」", next: "ldk" },
          { label: "「仕上げに入ろう」", next: "finish" }
        ]
      },
      plan: {
        bg: "assets/backgrounds/bg-rigna-ldk.jpg",
        speaker: "お客様",
        img: "assets/char-customer-man.png",
        kicker: "打合せ",
        title: "「通路、これくらいあると歩きやすいかな」",
        body: "「窓の高さに合う照明がいいんだよね。\n数字が合うと、なんか部屋の空気まで変わる気がする」",
        choices: [
          { label: "「ショールームの実物も見てみます」", next: "shop" },
          { label: "「じゃあ、提案まとめましょう」", next: "finish" }
        ]
      },
      ldk: {
        bg: "assets/backgrounds/bg-rigna-ldk.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "暮らしの一式",
        title: "「リビング・ダイニング・キッチン、つなげて見せる」",
        body: "「ソファの先に食卓、その奥にキッチン。\n一日の動線が、そのまま景色になるの」",
        choices: [
          { label: "「仕上げ、いこう」", next: "finish" }
        ]
      },
      finish: {
        bg: "assets/backgrounds/bg-rigna-living-brick.jpg",
        speaker: "先輩・杏",
        img: "assets/char-campus.png",
        kicker: "提案のあと",
        title: "「完璧な一点より、使える組み合わせだよ」",
        body: "「ぴたっと寄せられたら、それだけで喜ばれる。\n景色つくる仕事って、選択の整理でもあるんだ」",
        choices: [
          { label: "「景色づくり、もっとやりたい」", next: "end-craft" },
          { label: "「提案の型、学びたい」", next: "end-plan" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-rigna-showroom.jpg",
        kicker: "この人生の感触",
        title: "部屋の景色、変えられる気がした。",
        body: "商品は物でも、渡してるのは暮らしの空気。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-plan": {
        ending: true,
        bg: "assets/backgrounds/bg-rigna-sideboard.jpg",
        kicker: "この人生の感触",
        title: "聞く・測る・並べる——その順番が残った。",
        body: "型があるから、信頼につながる。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
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
        title: "１センチ違うと、部屋が変わる。",
        body: "オーダーメイドの収納棚。注文票の数字が、今日の現場だ。\n高さ、幅、奥行き——１cm単位で、ぴたっと合わせる。",
        choices: [
          { label: "工場の通路を歩いてみる", next: "factory" },
          { label: "完成イメージの棚から見る", next: "lineup" }
        ]
      },
      factory: {
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "工場",
        title: "「板が棚になるところ、見てみろ」",
        body: "「切断、組立、検査。数字の並びが、誰かの使いやすさになる。\n……分かるだろ、この音」",
        choices: [
          { label: "「機械のライン、見たいです」", next: "machine" },
          { label: "「寸法の確認から入ります」", next: "measure" }
        ]
      },
      lineup: {
        bg: "assets/backgrounds/bg-taiyo-shelf-lineup.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "オーダー",
        title: "「同じ『棚』でも、寸法で別物になる」",
        body: "「色も高さも、お客様の壁に合わせて決める。\n既製品の端と、指定寸法の差——そこが勝負だ」",
        choices: [
          { label: "「組立の手元、見せてください」", next: "bench" },
          { label: "「生産の管理板も見たいです」", next: "board" }
        ]
      },
      machine: {
        bg: "assets/backgrounds/bg-taiyo-machine.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "加工",
        title: "「板は、機械を通って棚の骨格になる」",
        body: "「押す力、速さ、面の仕上がり。\nここが甘いと、あとで１cmが泣くわ」",
        choices: [
          { label: "「組立の作業台へ」", next: "bench" },
          { label: "「寸法の確認もやりたい」", next: "measure" }
        ]
      },
      measure: {
        bg: "assets/backgrounds/bg-taiyo-bench.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "１cm",
        title: "「メジャーは、口より先に正直だ」",
        body: "「指定寸法と現物。ズレたら組み直せ。\nゆるくないぞ——でも、それがぴたっとの正体だ」",
        choices: [
          { label: "「組立の続き、見ます」", next: "bench" },
          { label: "「管理板の流れも知りたい」", next: "board" }
        ]
      },
      bench: {
        bg: "assets/backgrounds/bg-taiyo-bench.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "組立",
        title: "「釘一本も、寸法の延長線だ」",
        body: "「フレームが直角か、棚板が素直か。\n音と手応えで分かる。焦ると曲がる」",
        choices: [
          { label: "「納品後の部屋も見てみたい」", next: "room" },
          { label: "「管理板、確認します」", next: "board" }
        ]
      },
      board: {
        bg: "assets/backgrounds/bg-taiyo-board.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "生産管理",
        title: "「今日の棚は、ここに並んでる」",
        body: "「何時に誰のオーダーが流れるか。\n派手じゃないけど、遅れないための地図だ」",
        choices: [
          { label: "「部屋に収まった姿、見たい」", next: "room" },
          { label: "「製造、もっと深掘りしたい」", next: "end-craft" }
        ]
      },
      room: {
        bg: "assets/backgrounds/bg-taiyo-shelf-room.jpg",
        speaker: "先輩・浜田",
        img: senior,
        kicker: "納品の先",
        title: "「壁にぴたっと吸いつくとな、仕事が終わる」",
        body: "「本も花も、寸法の正しさの上に乗る。\n１cmの仕事が、暮らしの景色になるんだ」",
        choices: [
          { label: "「製造の腕、磨きたいです」", next: "end-craft" },
          { label: "「品質・管理側も見てみたいです」", next: "end-qc" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-taiyo-factory.jpg",
        kicker: "この人生の感触",
        title: "１cmを合わせる感覚が、残った。",
        body: "派手さより、寸法の正しさ。\nそれが人のストレスを減らす。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-qc": {
        ending: true,
        bg: "assets/backgrounds/bg-taiyo-shelf-lineup.jpg",
        kicker: "この人生の感触",
        title: "検査と段取りが、次の棚を守る。",
        body: "一枚の板の正しさが、届いた先の安心になる。",
        reality: [
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
        ]
      }
    };
  }

  function miharaLinkedQuest() {
    const name = "株式会社綿伴美原商店";
    return {
      start: {
        bg: "assets/backgrounds/bg-tea-shop-exterior-day.jpg",
        kicker: `QUEST / ${name}`,
        title: "香りが先に来る。『おいしい』が近い店。",
        body: "お茶とおかし、カフェのやさしい空気。\n今日は売場と喫茶、両方覚える一日。",
        choices: [
          { label: "ショーケースの前で覚える", next: "counter" },
          { label: "喫茶席の動きを見る", next: "cafe" }
        ]
      },
      counter: {
        bg: "assets/backgrounds/bg-tea-shop-counter.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "売場",
        title: "「季節、ガラスの向こうに並んでるでしょ」",
        body: "「名前、賞味、並べ方。入れ替えが店の顔になるの。\n……まずは指差しでいこう」",
        choices: [
          { label: "「上生菓子の仕込み、見たいです」", next: "sweets" }
        ]
      },
      cafe: {
        bg: "assets/backgrounds/bg-tea-shop-cafe.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "喫茶",
        title: "「休日の人も、仕事帰りの人も、同じ席」",
        body: "「淹れ方、出すタイミング、案内。\n一杯の向こうに、その人の一日があるんだよ」",
        choices: [
          { label: "「仕込みも見てみたいです」", next: "sweets" }
        ]
      },
      sweets: {
        bg: "assets/backgrounds/bg-jonamashi.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "上生菓子",
        title: "「小さいのに、季節が一言で分かるでしょ」",
        body: "「仕込み、盛り、ショーケース。\n味の現場って、手の積み重ねなんだ」",
        choices: [
          { label: "「ぶどうの生菓子、見せて」", next: "seasonal" },
          { label: "「ホール菓子の棚も見たい」", next: "cheesecake" }
        ]
      },
      seasonal: {
        bg: "assets/backgrounds/bg-mihara-grape-mochi.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "季節限定",
        title: "「中の色、見て。いまの旬だよ」",
        body: "「香りも提案の材料。お茶との合わせまで考えると、\n売場がいつの間にか物語になるの」",
        choices: [
          { label: "「これ、実際に買ってみたい」", next: "shop-site" },
          { label: "「ホールケーキも見たい」", next: "xmas-cake" },
          { label: "「味の現場、もっと知りたい」", next: "end-craft" }
        ]
      },
      cheesecake: {
        bg: "assets/backgrounds/bg-mihara-cheesecake.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "菓子",
        title: "「見た目で手に取ってもらって、味でもう一回来てもらう」",
        body: "「かわいい形も、立派なコミュニケーション。\n説明の一言が、初めてのお客様の一歩目になるよ」",
        choices: [
          { label: "「実際に買ってみたい」", next: "shop-site" },
          { label: "「季節のホールも見たい」", next: "xmas-cake" },
          { label: "「味の現場、もっと」", next: "end-craft" }
        ]
      },
      "xmas-cake": {
        bg: "assets/backgrounds/bg-mihara-xmas-cake.jpg",
        speaker: "先輩・陽菜",
        img: "assets/char-campus.png",
        kicker: "季節のケーキ",
        title: "「これ、年末の食卓の話になるケーキ」",
        body: "「和の香り乗せたホールって、贈る理由ができるの。\n予約の電話鳴り始めたら、店の空気が一段階変わるよ」",
        choices: [
          { label: "「買ってみたい」", next: "shop-site" },
          { label: "「味の現場を深掘りしたい」", next: "end-craft" },
          { label: "「接客と売場、学びたい」", next: "end-service" }
        ]
      },

      // --- 収益イメージ②：QUEST → 購入サイト（デモは実サイト画像。外部リンクなし） ---
      "shop-site": {
        event: {
          label: "PURCHASE SITE",
          icon: "◎",
          title: "購入サイトへ",
          text: "興味を持った商品の、本物の販売ページが開く。"
        },
        shopSite: true,
        bg: "assets/backgrounds/bg-mihara-shop-cheesecake.jpg",
        speaker: "購入サイト",
        img: "assets/char-campus.png",
        kicker: "PATTERN / 実購入へつなぐ",
        title: "QUESTの続きが、買う画面になる。",
        body: "デモでは実サイトへ飛ばさず、購入ページの画面を表示している。\n本番では、ここから公式オンラインショップで決済できる。",
        choices: [
          { label: "カートに入れる流れを想像する", next: "shop-cart" },
          { label: "この接続パターンを確認する", next: "end-shop" }
        ]
      },
      "shop-cart": {
        shopSite: true,
        bg: "assets/backgrounds/bg-mihara-shop-cheesecake.jpg",
        speaker: "購入サイト",
        img: "assets/char-campus.png",
        kicker: "買う直前",
        title: "価格も、ギフト仕様も、ここで決まる。",
        body: "ゲームで知った物語が、注文の理由になる。\n掲載だけで終わらず、売上が立つ層がここだ。",
        choices: [
          { label: "接続パターンを確認する", next: "end-shop" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-mihara-grape-mochi.jpg",
        kicker: "この人生の感触",
        title: "おいしいの顔が見える仕事が、残った。",
        body: "香りと味の距離が近いほど、判断も早くなる。\n気になる商品があれば、購入サイトへも進める。",
        reality: [
          { label: "気になる商品を実際に買ってみる", href: "#reality-shop" },
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" }
        ]
      },
      "end-service": {
        ending: true,
        bg: "assets/backgrounds/bg-tea-shop-exterior-dusk.jpg",
        kicker: "この人生の感触",
        title: "接客のテンポが、店の空気をつくると分かった。",
        body: "商品知識と、人への丁寧さが同じ現場にある。",
        reality: [
          { label: "気になる商品を実際に買ってみる", href: "#reality-shop" },
          { label: "別の働き方も試してみる", href: "#reality-work" }
        ]
      },
      "end-shop": {
        ending: true,
        shopPattern: true,
        bg: "assets/backgrounds/bg-mihara-shop-cheesecake.jpg",
        kicker: "PATTERN / 実購入接続",
        title: "知って、欲しくなって、買う場所まで届いた。",
        body: "収益イメージの②番。QUEST掲載の先に、購入サイトへの送客がある。\nデモは画面表示のみ。本番は公式ショップで決済し、成果報酬／社内計上で収益化できる。",
        reality: [
          { label: "もう一度、購入ページを見る", href: "#reality-shop" },
          { label: `${name}の仕事QUESTに戻る`, href: "#reality-work" }
        ]
      }
    };
  }

  // --- 汎用寄り企業：公開してよい「仕事の感触」だけ。実名・固有案件・数値は入れない ---

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
        title: "「カートがぶつからない道が、いちばんのおもてなし」",
        body: "安いだけじゃない。\n取りやすさと見やすさが、売上を支える。",
        choices: [
          { label: "入口の案内、わかりやすくする", next: "day" },
          { label: "レジ前の待ち、減らす工夫する", next: "day" }
        ]
      },
      campaign: {
        kicker: "企画",
        title: "「お得、短いほど届くよ」",
        body: "全品セールか、季節のまとめか。\n選び方で、来る人の顔が変わる。",
        choices: [
          { label: "誰でもわかる全品訴求", next: "day" },
          { label: "季節テーマで世界観つくる", next: "day" }
        ]
      },
      day: {
        kicker: "当日",
        title: "……開店前の空気、いちばん緊張する。",
        body: "スタッフの声、カートの軋み、初めてのお客様の表情。\n画面の注文も、店頭の笑顔も、同じ一日だ。",
        choices: [
          { label: "店舗オペ、深掘りしたい", next: "end-craft" },
          { label: "オンラインとの連携も見たい", next: "end-link" }
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
        title: "ネットと店は、対立じゃなく往復だった。",
        body: "画面と売場、別々に見えて一本だ。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function tradingThemeQuest() {
    const name = "綿伴トレジャーディング株式会社";
    return {
      start: {
        bg: "assets/backgrounds/bg-trading-sabovege-field.jpg",
        kicker: `QUEST / ${name}`,
        title: "まだ知らない『おいしい』を、机に乗せる。",
        body: "産地、品質、伝え方。新しい食材は説明から。\n今日は畑見学と試食会だ。",
        choices: [
          { label: "味の紹介コーナーを担当する", next: "taste" },
          { label: "売り場向けの説明カードを作る", next: "card" }
        ]
      },
      taste: {
        bg: "assets/backgrounds/bg-trading-sabovege-dish.jpg",
        kicker: "試食会",
        title: "「食べたことない……けど、おいしい？」",
        body: "警戒→興味→質問。\n新しい食は、会話の設計でもある。",
        choices: [
          { label: "「レシピ例、一緒に渡そう」", next: "sell" },
          { label: "「産地の話、短く添えるね」", next: "sell" }
        ]
      },
      card: {
        bg: "assets/backgrounds/bg-trading-sabovege-field.jpg",
        kicker: "伝材",
        title: "「難しい言葉、棚の前では重いよ」",
        body: "専門用語は誇りだけど、一歩目には向かない。\n『見たことある葉っぱが、食卓に来る』——それがいちばん届く。",
        choices: [
          { label: "やさしい言葉で書き直す", next: "sell" },
          { label: "写真多めにして直感で伝える", next: "sell" }
        ]
      },
      sell: {
        bg: "assets/backgrounds/bg-trading-sabovege-dish.jpg",
        kicker: "そのあと",
        title: "知る・食べる・売る——同じチームの一日。",
        body: "新しいものは、押すほど売れない。\n理解が先、注文はあと。",
        choices: [
          { label: "食の新規、深掘りしたい", next: "end-craft" },
          { label: "流通と店舗の連携も見たい", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-trading-sabovege-dish.jpg",
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
        bg: "assets/backgrounds/bg-trading-sabovege-field.jpg",
        kicker: "この人生の感触",
        title: "産地と売場のあいだに、席があった。",
        body: "運ぶだけじゃない。意味も運ぶ。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
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
        bg: "assets/backgrounds/bg-kenzai-yard.jpg",
        kicker: `QUEST / ${name}`,
        title: "家の骨組み——今日の主役は資材だ。",
        body: "木の名前、届け先、品質。\n『安心』は、見えないところに積まれる。",
        choices: [
          { label: "地元の木の資材を学ぶ", next: "local" },
          { label: "納品に同行してみる", next: "deliver" }
        ]
      },
      local: {
        bg: "assets/backgrounds/bg-kenzai-lumber.jpg",
        speaker: "先輩・樫",
        img: senior,
        kicker: "品質",
        title: "「基準を超える、はスローガンじゃない」",
        body: "「チェック表だ。見えないとこほど後から効く。\n今日の確認が、十年後の暮らしになるぞ」",
        choices: [
          { label: "「丸太置場も見てみたいです」", next: "yard" },
          { label: "「安全の説明、練習します」", next: "talk" }
        ]
      },
      deliver: {
        bg: "assets/backgrounds/bg-kenzai-loading.jpg",
        speaker: "先輩・樫",
        img: senior,
        kicker: "納品",
        title: "「現場の朝は、資材の到着から始まる」",
        body: "「遅れると止まる。早すぎても置き場がない。\nタイミングも、技術のうちだ」",
        choices: [
          { label: "「積み込み、手伝います」", next: "yard" },
          { label: "「監督さんの話、聞きます」", next: "talk" }
        ]
      },
      yard: {
        bg: "assets/backgrounds/bg-kenzai-logs.jpg",
        speaker: "先輩・樫",
        img: senior,
        kicker: "置場",
        title: "「この山が、次の家の骨になる」",
        body: "「運び方、積み方、雨の当て方。\n木の扱いが、そのまま品質だ」",
        choices: [
          { label: "「一日の芯、聞かせてください」", next: "talk" }
        ]
      },
      talk: {
        bg: "assets/backgrounds/bg-kenzai-lumber.jpg",
        speaker: "先輩・樫",
        img: senior,
        kicker: "一日の芯",
        title: "「お客様に会わなくてもな」",
        body: "「家族の『ここがいい』の土台は、こっちでつくってる。\n……誇りだろ？」",
        choices: [
          { label: "「資材のプロ、目指したいです」", next: "end-craft" },
          { label: "「現場向けの提案、深めたいです」", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-kenzai-lumber.jpg",
        kicker: "この人生の感触",
        title: "見えない部分を支える仕事が、残った。",
        body: "派手さより、確かさ。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-kenzai-yard.jpg",
        kicker: "この人生の感触",
        title: "資材と家づくり、一つの現場だった。",
        body: "現場の言葉が、資材の置き方とつながる。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function realestateThemeQuest() {
    const name = "綿伴レアルエステート株式会社";
    const senior = "assets/char-office.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-realestate-office-street.jpg",
        kicker: `QUEST / ${name}`,
        title: "物件は、動かす・守る・整える——三つの仕事がある。",
        body: "売買、資産管理、建物管理。\n今日は、どの入口から触れてみる？",
        choices: [
          { label: "売買——物件の流動化を見る", next: "trade" },
          { label: "資産管理——オーナーの一日を支える", next: "asset" },
          { label: "建物管理——維持と修繕の現場", next: "building" }
        ]
      },
      trade: {
        bg: "assets/backgrounds/bg-realestate-tenant-building.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "売買",
        title: "「売主さんも買主さんも、納得がいちばん大事」",
        body: "「オフィスもテナントビルも戸建ても、流れをつくる仕事だ。\nバリューアップってのは、ただの模様替えじゃないぞ」",
        choices: [
          { label: "「価値を上げるって、具体的に？」", next: "valueup" },
          { label: "「エンドユーザーまでの流れ、見たい」", next: "valueup" }
        ]
      },
      valueup: {
        bg: "assets/backgrounds/bg-realestate-vacant-room.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "バリューアップ",
        title: "「収益性と資産価値——両方に効く一手を探す」",
        body: "「空室の空気が変わるだけで、話が前に進むこともある。\n……管理側の仕事も、つながってるんだよ」",
        choices: [
          { label: "「資産管理の話も聞きたいです」", next: "asset" },
          { label: "「建物側の現場も見たいです」", next: "building" }
        ]
      },
      asset: {
        bg: "assets/backgrounds/bg-realestate-pm-desk.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "資産管理",
        title: "「オーナーさんにとって、ここは大事な財産だ」",
        body: "「リーシング、契約、入居者対応、入出金、報告書——\n煩雑なやつを、一手に引き受ける。それがプロパティマネジメント」",
        choices: [
          { label: "「入居者対応、どうしてます？」", next: "leasing" },
          { label: "「賃貸の仲介・企画もやるんですか」", next: "leasing" }
        ]
      },
      leasing: {
        bg: "assets/backgrounds/bg-realestate-tenant-building.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "運営",
        title: "「快適な都市生活——言葉は大きいけど、中身は地味だ」",
        body: "「立地と機能。事務所も店舗もアパートも。\n安定して回すためのスキームを、一緒に組む仕事だよ」",
        choices: [
          { label: "「建物の維持管理も見てみたい」", next: "building" },
          { label: "「一日の感触、まとめたい」", next: "wrap" }
        ]
      },
      building: {
        bg: "assets/backgrounds/bg-realestate-rooftop.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "建物管理",
        title: "「設備点検、消防、清掃——専門家の仕事が並ぶ」",
        body: "「屋上の機械も、廊下の美観も、同じ管理の線だ。\n大規模修繕は、価値を守るための大きな一手になる」",
        choices: [
          { label: "「修繕の足場、見に行きたいです」", next: "repair" },
          { label: "「売買の現場ともつながりますか」", next: "wrap" }
        ]
      },
      repair: {
        bg: "assets/backgrounds/bg-realestate-scaffold.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "大規模修繕",
        title: "「最高の状態に近づける——それが管理のゴール」",
        body: "「オフィスも商業ビルもマンションも、環境は全部違う。\nだから総合的なノウハウが要るんだ」",
        choices: [
          { label: "「一日の感触、まとめます」", next: "wrap" }
        ]
      },
      wrap: {
        bg: "assets/backgrounds/bg-realestate-office-street.jpg",
        speaker: "先輩・芹沢",
        img: senior,
        kicker: "一日の芯",
        title: "「動かす・守る・整える。不動産は三拍子だ」",
        body: "「どれか一つだけじゃ、物件は生きない。\n……お前は、どこが肌に合いそうだ？」",
        choices: [
          { label: "「売買・流動化側に惹かれます」", next: "end-trade" },
          { label: "「管理で価値を守る側が気になります」", next: "end-manage" }
        ]
      },
      "end-trade": {
        ending: true,
        bg: "assets/backgrounds/bg-realestate-tenant-building.jpg",
        kicker: "この人生の感触",
        title: "双方が納得する流れをつくる仕事が、残った。",
        body: "物件は数字だけじゃない。人と価値のつなぎ目だ。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-manage": {
        ending: true,
        bg: "assets/backgrounds/bg-realestate-scaffold.jpg",
        kicker: "この人生の感触",
        title: "財産を守り、価値を高める仕事が、残った。",
        body: "日々の点検も、大きな修繕も、同じ線の上にある。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
          { label: `${name}の説明会・採用情報を見る`, href: "#reality-event" }
        ]
      }
    };
  }

  function resortThemeQuest() {
    const name = "株式会社綿伴リゾート";
    const senior = "assets/char-campus.png";
    return {
      start: {
        bg: "assets/backgrounds/bg-resort-entrance-day.jpg",
        kicker: `QUEST / ${name}`,
        title: "石の段を上がった先が、旅の入口だ。",
        body: "山あいの宿。チェックインからお見送りまで、\n一日の流れそのものが、おもてなしになる。",
        choices: [
          { label: "フロントでお出迎えを覚える", next: "front" },
          { label: "囲炉裏ロビーの空気を先に吸う", next: "irori-lobby" }
        ]
      },
      front: {
        bg: "assets/backgrounds/bg-resort-lobby-irori.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "フロント",
        title: "「ようこそ。——最初の表情、ここで決まるよ」",
        body: "「地図、お部屋、小さな要望。\n家族連れには、安心の言葉が先に立つんだ」",
        choices: [
          { label: "「お部屋へご案内しますね」", next: "room-pick" },
          { label: "「囲炉裏の席、先に整えます」", next: "irori" }
        ]
      },
      "irori-lobby": {
        bg: "assets/backgrounds/bg-resort-lobby-irori.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "ロビー",
        title: "「紫の傘と自在鉤——ここ、宿の顔だよ」",
        body: "「座布団の向き、花の位置、受付の視線。\n派手なことはしない。でも、ちゃんと迎えてる感が出る」",
        choices: [
          { label: "「窓側の囲炉裏も見てみたい」", next: "irori" },
          { label: "「客室の整え方、知りたいです」", next: "room-pick" }
        ]
      },
      "room-pick": {
        bg: "assets/backgrounds/bg-resort-room-wa.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "和室",
        title: "「和室は、入った瞬間に肩が落ちるでしょ」",
        body: "「畳、ちゃぶ台、窓の山並み。\n『休める』は、整える手仕事でできてるんだよ」",
        choices: [
          { label: "「こちらの和室コーナーも見せて」", next: "room-wa-corner" },
          { label: "「洋室も見せてください」", next: "room-western" },
          { label: "「お食事の時間、確認します」", next: "irori" }
        ]
      },
      "room-wa-corner": {
        bg: "assets/backgrounds/bg-resort-room-wa-corner.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "和室",
        title: "「窓際の席、森の緑がいちばん近い」",
        body: "「座椅子の向き、花一枝、ランプのあたたかさ。\n小さな整えが、滞在の印象になるよ」",
        choices: [
          { label: "「洋室も見せてください」", next: "room-western" },
          { label: "「囲炉裏の席へ行きたい」", next: "irori" },
          { label: "「お湯の案内、しますね」", next: "onsen" }
        ]
      },
      "room-western": {
        bg: "assets/backgrounds/bg-resort-room-western.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "洋室",
        title: "「洋室は、ベッドの並びと間接光がいちばん大事」",
        body: "「枕元の明かり、荷物の置き場、朝の動線。\n細かいほど、翌朝の表情が変わるんだ」",
        choices: [
          { label: "「囲炉裏の席、見に行きたい」", next: "irori" },
          { label: "「湯の案内、練習したい」", next: "onsen" }
        ]
      },
      irori: {
        bg: "assets/backgrounds/bg-resort-irori-day.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "囲炉裏",
        title: "「炭の香りが、会話をゆっくりにする」",
        body: "「山の景色を見ながら、席の温度を感じる。\n今日のごはん、火のそばで見てみよう」",
        choices: [
          { label: "「料理の盛りつけ、見せてください」", next: "cuisine" },
          { label: "「釜の位置、先に覚えます」", next: "cuisine" }
        ]
      },
      cuisine: {
        bg: "assets/backgrounds/bg-resort-cuisine.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "料理",
        title: "「見て——火が、いちばんの主役だよ」",
        body: "「魚も芋もきりたんぽも、炭の色でタイミングが分かる。\n牛肉のせいろ、そば、小鉢……全部、今日の物語」",
        choices: [
          { label: "「配膳の間合い、練習します」", next: "serve" },
          { label: "「焼き場の手元、もう少し見る」", next: "serve" }
        ]
      },
      serve: {
        bg: "assets/backgrounds/bg-resort-cuisine.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "場づくり",
        title: "「出す早さより、出す間合い」",
        body: "「話し込んでる席は急がない。\n静かな席は、湯気のタイミングで声をかける」",
        choices: [
          { label: "「お湯の案内へ行きます」", next: "onsen" },
          { label: "「客室の最終確認もしたい」", next: "room-pick" }
        ]
      },
      onsen: {
        bg: "assets/backgrounds/bg-resort-onsen.jpg",
        speaker: "先輩・栞",
        img: senior,
        kicker: "湯",
        title: "「露天の風が、一日の疲れをほどく」",
        body: "「宿の仕事は、『休ませる』ための段取り。\n自分も動きながら、お客様の静けさを守るんだ」",
        choices: [
          { label: "「接客、もっと深掘りしたい」", next: "end-craft" },
          { label: "「場づくり・囲炉裏側も見たい」", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-resort-room-wa.jpg",
        kicker: "この人生の感触",
        title: "人を休ませる仕事の手応えが、残った。",
        body: "笑顔の裏に、見えない準備がある。\n部屋の光一本が、旅の印象になる。",
        reality: [
          { label: `${name}の仕事をもう少し知る`, href: "#reality-work" },
          { label: "職場見学・インターンを調べる", href: "#reality-event" }
        ]
      },
      "end-link": {
        ending: true,
        bg: "assets/backgrounds/bg-resort-cuisine.jpg",
        kicker: "この人生の感触",
        title: "宿は、食・湯・部屋の連携だった。",
        body: "炭の香りも、フロントの一言も、同じ一日の線。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
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
        bg: "assets/backgrounds/bg-woodpower-forest.jpg",
        kicker: `QUEST / ${name}`,
        title: "森と生きて、森を生かす。木がエネルギーになる。",
        body: "植える、育てる、使う、また植える。\nその先に、あかりとあたたかさがある。",
        choices: [
          { label: "発電の流れ、見学する", next: "plant" },
          { label: "循環の話、聞いてみる", next: "cycle" }
        ]
      },
      plant: {
        bg: "assets/backgrounds/bg-woodpower-plant.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "発電",
        title: "「木くずも端材も、燃料として息づく」",
        body: "「燃やして終わり、じゃない。\n熱が電気になって、地域の暮らしにつながるんだ」",
        choices: [
          { label: "「安全確認、覚えます」", next: "safety" },
          { label: "「燃料の受け入れ、手伝います」", next: "fuel" }
        ]
      },
      cycle: {
        bg: "assets/backgrounds/bg-woodpower-forest.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "循環",
        title: "「遠い燃料に頼らない、ってことだ」",
        body: "「守りながら使う。使いながら育てる。\n数字の前に、関係性の設計がある」",
        choices: [
          { label: "「端材が燃料になるとこ、見たい」", next: "fuel" },
          { label: "「また植える側の話、聞きたい」", next: "safety" }
        ]
      },
      fuel: {
        bg: "assets/backgrounds/bg-woodpower-chipper.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "燃料",
        title: "「丸太がチップになる。次の電力の準備だ」",
        body: "「水分、量、運び方。燃え方は手入れの結果。\n砕く音の向こうで、判断は止まらない」",
        choices: [
          { label: "「チップの山、見に行きます」", next: "chips" },
          { label: "「監視の部屋、行きたいです」", next: "watch" }
        ]
      },
      chips: {
        bg: "assets/backgrounds/bg-woodpower-chips.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "チップ",
        title: "「この山が、燃料の在庫だ」",
        body: "「積み方と湿り気。重機のまわりは一歩ずつな。\n静かに見える現場ほど、段取りが命だ」",
        choices: [
          { label: "「監視室、行きましょう」", next: "watch" }
        ]
      },
      safety: {
        bg: "assets/backgrounds/bg-woodpower-chips.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "安全",
        title: "「再生エネルギーでも、危険ゼロじゃない」",
        body: "「手順書、貼ってあるだけじゃ意味ない。\n今日の確認が、明日の運転を守る」",
        choices: [
          { label: "「チップ製造も見たいです」", next: "fuel" },
          { label: "「監視室へ行きます」", next: "watch" }
        ]
      },
      watch: {
        bg: "assets/backgrounds/bg-woodpower-plant.jpg",
        speaker: "先輩・青葉",
        img: senior,
        kicker: "監視",
        title: "「メーターと警報が、森の先の一日を映す」",
        body: "「安定して回すことが、いちばんの貢献になる日もある。\n派手さより、続く運転だ」",
        choices: [
          { label: "「運転・現場、深掘りしたい」", next: "end-craft" },
          { label: "「森の循環づくりも見たい」", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-woodpower-plant.jpg",
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
        bg: "assets/backgrounds/bg-woodpower-forest.jpg",
        kicker: "この人生の感触",
        title: "発電は、森のサイクルの一部だった。",
        body: "使うだけで終わらせない。次の木につながる仕事。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
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
        body: "温湿度の遠隔、カメラの見守り、循環。\n今日は、人が舎に入らない飼育の見学だ。",
        choices: [
          { label: "モニター室で見守りを学ぶ", next: "monitor" },
          { label: "えさのタンクの話を聞く", next: "feed" }
        ]
      },
      monitor: {
        bg: "assets/backgrounds/bg-farm-monitor.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "見守り",
        title: "「画面の向こう、小さな変化拾える？」",
        body: "「ズームできるよ。体調のサインは数字より先に『様子』で出ることもある。\n人が入らない時間を守るのも、健康のための仕事」",
        choices: [
          { label: "「出荷の仕分け、見たいです」", next: "sort" },
          { label: "「快適さの自動調整、見たいです」", next: "climate" }
        ]
      },
      feed: {
        bg: "assets/backgrounds/bg-farm-silos.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "えさ",
        title: "「地元の素材と循環が、配合になる」",
        body: "「自社の作物も、戻ってきた食材も、口に入る前に整える。\n給餌も給水も自動。舎に人を入れないための段取りだよ」",
        choices: [
          { label: "「仕分けの仕組み、見たい」", next: "sort" },
          { label: "「快適さの調整、見たい」", next: "climate" }
        ]
      },
      sort: {
        bg: "assets/backgrounds/bg-farm-interior.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "仕分け",
        title: "「体重で、次の場所へ案内してる」",
        body: "「力任せじゃなく、流れで判断。\n出荷も、生き物のリズムに合わせた段取りだよ」",
        choices: [
          { label: "「清掃ロボットも追ってみる」", next: "clean" }
        ]
      },
      climate: {
        bg: "assets/backgrounds/bg-farm-aerial.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "環境",
        title: "「夏は冷やして、冬はあたためて」",
        body: "「温度・湿度・換気、遠隔で整える。\nストレス減らすのも、立派な飼育の技術だよ」",
        choices: [
          { label: "「清掃ロボットも見たい」", next: "clean" }
        ]
      },
      clean: {
        bg: "assets/backgrounds/bg-farm-interior.jpg",
        speaker: "先輩・牧",
        img: senior,
        kicker: "清潔",
        title: "「洗浄ロボット、静かに床を整えてるでしょ」",
        body: "「きれいさは、においの前に仕組みで守る。\n外から菌を持ち込まないのも、一日の設計のうち」",
        choices: [
          { label: "「飼育の現場感、深掘りしたい」", next: "end-craft" },
          { label: "「循環の仕組み側も見たい」", next: "end-link" }
        ]
      },
      "end-craft": {
        ending: true,
        bg: "assets/backgrounds/bg-farm-interior.jpg",
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
        bg: "assets/backgrounds/bg-farm-silos.jpg",
        kicker: "この人生の感触",
        title: "世話と循環、同じ現場だった。",
        body: "堆肥も、えさも、見守りも、命のまわりにある。",
        reality: [
          { label: "別の働き方も試してみる", href: "#reality-work" },
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
        branchNote: "会社を選んでQUESTへ（社名はかわいくデフォルメしたデモ用）",
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
            blurb: "売場づくりとお客様対応。日用品の店の日常",
            img: "assets/char-homeaid-woman.png",
            scenes: homeMadeEventQuest()
          },
          {
            id: "co-solutions",
            label: "綿伴ソウリューションズ株式会社",
            tag: "建築・設備",
            blurb: "鉄骨・溶接から立駐・倉庫まで。現場で解く",
            img: "assets/char-work-uniform-site-man.png",
            scenes: solutionsLinkedQuest()
          },
          {
            id: "co-mihara",
            label: "株式会社綿伴美原商店",
            tag: "食品・茶",
            blurb: "お茶・上生菓子・喫茶。香りと味の現場",
            scenes: miharaLinkedQuest()
          },
          {
            id: "co-house",
            label: "株式会社綿伴林郷の家",
            tag: "住宅",
            blurb: "図面と会話で家をつくる。暮らしの器づくり",
            scenes: houseLinkedQuest()
          },
          {
            id: "co-taiyo",
            label: "太平洋株式会社",
            tag: "家具製造",
            blurb: "１cm単位のオーダーメイド収納棚をつくる",
            img: "assets/char-work-senior-man.png",
            scenes: taiyoLinkedQuest()
          },
          {
            id: "co-ligna",
            label: "リグナチュラ株式会社",
            tag: "インテリア",
            blurb: "店頭と提案で、部屋の景色を整える",
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
            blurb: "売買・資産管理・建物管理。物件の価値を動かす",
            img: "assets/char-office.png",
            scenes: realestateThemeQuest()
          },
          {
            id: "co-resort",
            label: "株式会社綿伴リゾート",
            tag: "宿・観光",
            blurb: "囲炉裏と和モダン客室で、山あいのおもてなし",
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
