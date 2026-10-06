window.LIFE_QUEST = {
  lives: [
    {
      id: "bigco",
      label: "大企業で働く",
      hint: "安定のイメージの先を、一度のぞく",
      scenes: {
        start: {
          kicker: "QUEST / 大企業",
          title: "入社一年目。あなたの席は、大きなフロアの端にある。",
          body: "名刺の会社名は強い。周囲も優秀だ。\nでも、自分の仕事が誰の人生を動かしているのかは、まだよく見えない。",
          choices: [
            { label: "まずは与えられた役割を極める", next: "role" },
            { label: "別部署の人と話して、全体を知る", next: "network" }
          ]
        },
        role: {
          kicker: "選択のあと",
          title: "任された業務は、確実に回せるようになった。",
          body: "評価も悪くない。ただ、同じ週が何度も来る感覚もある。\n「このまま三年後も、同じ景色か？」と、ふと思う。",
          choices: [
            { label: "社内の新規プロジェクトへ手を挙げる", next: "end-challenge" },
            { label: "まずは現場のプロとして深掘りする", next: "end-craft" }
          ]
        },
        network: {
          kicker: "選択のあと",
          title: "他部署を知ると、会社が一つの街みたいに見えてきた。",
          body: "営業、開発、人事。それぞれ違う正義を持っている。\n大企業の強さは資源だけじゃない。選択肢の多さでもある。",
          choices: [
            { label: "自分から企画を通してみる", next: "end-challenge" },
            { label: "まずは一人の専門家として立つ", next: "end-craft" }
          ]
        },
        "end-challenge": {
          ending: true,
          kicker: "この人生の感触",
          title: "大きな組織の中で、小さな挑戦を動かせた。",
          body: "安定だけが大企業じゃない。資源があるから、試せることもある。\nでも、本当にこの仕事が自分の好奇心に合うかは、現実で確かめたくなる。",
          reality: [
            { label: "この仕事をもう少し知る（職場体験・インターン）", href: "#reality-work" },
            { label: "企業のオープンな説明会を調べる", href: "#reality-event" }
          ]
        },
        "end-craft": {
          ending: true,
          kicker: "この人生の感触",
          title: "派手さより、積み上がる力が残った。",
          body: "大きな看板の下で、自分の技能が育つ感覚。\n「とりあえず安定」ではなく、「ここで何を身につけるか」が見えてきた。",
          reality: [
            { label: "この職種の一日を調べる", href: "#reality-work" },
            { label: "実際のインターン情報を見る", href: "#reality-event" }
          ]
        }
      }
    },
    {
      id: "smallco",
      label: "小さな会社で働く",
      hint: "距離が近い現場で、自分の影響を感じる",
      scenes: {
        start: {
          kicker: "QUEST / 小さな会社",
          title: "社員数は少ない。あなたの一言が、すぐ空気を変える。",
          body: "朝会で決めたことが、午後には形になる。\n裁量は大きい。そのぶん、失敗もすぐに見える。",
          choices: [
            { label: "何でも引き受けて、仕事の幅を広げる", next: "wide" },
            { label: "得意なことに集中して、成果を出す", next: "focus" }
          ]
        },
        wide: {
          kicker: "選択のあと",
          title: "営業も、資料も、ちょっとした採用も、あなたの机に来る。",
          body: "成長は早い。同時に、疲弊も早い。\n「自分は何のプロなんだろう」と、夜に残ることがある。",
          choices: [
            { label: "それでも総合力を武器にする", next: "end-general" },
            { label: "役割を整理して、強みに戻る", next: "end-focus" }
          ]
        },
        focus: {
          kicker: "選択のあと",
          title: "得意領域で結果が出ると、周囲の期待が集まる。",
          body: "少人数だから、貢献が数字や表情ですぐ返ってくる。\nやりがいと責任が、同じ重さで乗ってくる。",
          choices: [
            { label: "さらに専門性を尖らせる", next: "end-focus" },
            { label: "次は後輩や仕組みづくりに関わる", next: "end-general" }
          ]
        },
        "end-general": {
          ending: true,
          kicker: "この人生の感触",
          title: "小さな会社は、人生の圧縮体験に近い。",
          body: "広く触れるほど、自分の向き不向きが早く分かる。\n「面白い」が残るなら、次は本物の現場で一日を過ごしたくなる。",
          reality: [
            { label: "中小・ベンチャーの職場体験を探す", href: "#reality-work" },
            { label: "気になる会社の一日密着を調べる", href: "#reality-event" }
          ]
        },
        "end-focus": {
          ending: true,
          kicker: "この人生の感触",
          title: "近い距離で、自分の強みが立体になった。",
          body: "少人数の現場は、肩書きより中身が先に見られる。\nこの感触が好きなら、現実のインターンで温度を確かめてほしい。",
          reality: [
            { label: "この職種で働ける会社を知る", href: "#reality-work" },
            { label: "体験授業や会社見学を探す", href: "#reality-event" }
          ]
        }
      }
    },
    {
      id: "startup",
      label: "自分で会社をつくる",
      hint: "ゼロから始める高揚と、空白の重さを試す",
      scenes: {
        start: {
          kicker: "QUEST / 起業",
          title: "屋号は決めた。まだ、客はいない。",
          body: "自由は大きい。誰も朝の予定を決めない。\nその空白を、自分で埋めなければならない。",
          choices: [
            { label: "まず一人に売ってみる", next: "sell" },
            { label: "先に仲間を集める", next: "team" }
          ]
        },
        sell: {
          kicker: "選択のあと",
          title: "最初の一人は、想像より遠い。",
          body: "断られるたびに、商品より自分の仮説が削れる。\nでも、一度「欲しい」と言われた瞬間、世界の解像度が変わる。",
          choices: [
            { label: "その声を手がかりに改良する", next: "end-product" },
            { label: "売る相手を変えて、市場を探る", next: "end-market" }
          ]
        },
        team: {
          kicker: "選択のあと",
          title: "仲間が増えると、速度と摩擦が同時に来る。",
          body: "一人では見えなかった穴が、会話で見つかる。\n一方で、価値観のずれも早く表面化する。",
          choices: [
            { label: "役割を分けて、小さくリリースする", next: "end-product" },
            { label: "誰に届けるかを、もう一度定義する", next: "end-market" }
          ]
        },
        "end-product": {
          ending: true,
          kicker: "この人生の感触",
          title: "つくる自由の裏に、引き受ける孤独がある。",
          body: "起業は夢の言い換えじゃない。仮説を現実に擦りつづける仕事だ。\nそれでもワクワクが残るなら、次は実際の起業家の話を聞きにいこう。",
          reality: [
            { label: "起業イベント・ピッチを調べる", href: "#reality-event" },
            { label: "学生向けの事業体験を探す", href: "#reality-work" }
          ]
        },
        "end-market": {
          ending: true,
          kicker: "この人生の感触",
          title: "「つくりたいもの」より「誰の困りごとか」が先に立った。",
          body: "起業の入口は、才能の証明より観察に近い。\nこの感覚が残るなら、現場の声を集めに行く番だ。",
          reality: [
            { label: "地域や業界の課題を知るイベントへ", href: "#reality-event" },
            { label: "実際の創業支援窓口を調べる", href: "#reality-work" }
          ]
        }
      }
    },
    {
      id: "univ",
      label: "大学へ進む",
      hint: "学びの四年を、目的のある時間に変える",
      scenes: {
        start: {
          kicker: "QUEST / 大学",
          title: "キャンパスは広い。時間割より、余白が多い。",
          body: "講義、サークル、バイト、研究。\n何を選んでも正解に見える。何を選ばなくても、四年は進む。",
          choices: [
            { label: "研究室やゼミで深く学ぶ", next: "deep" },
            { label: "学外のプロジェクトに時間を使う", next: "outside" }
          ]
        },
        deep: {
          kicker: "選択のあと",
          title: "一つの問いを追い続けると、世界が細かく見える。",
          body: "すぐに就活の話にはならない。\nでも、「考える筋力」がつく感覚はある。",
          choices: [
            { label: "この分野で大学院も視野に入れる", next: "end-research" },
            { label: "学びを社会側の課題につなげる", next: "end-bridge" }
          ]
        },
        outside: {
          kicker: "選択のあと",
          title: "学外は、フィードバックが早い。",
          body: "イベント運営、インターン、地域活動。\n大学は拠点で、学びの現場は外にもある。",
          choices: [
            { label: "実践を軸に、進路を探す", next: "end-bridge" },
            { label: "外で得た問いを、研究に持ち帰る", next: "end-research" }
          ]
        },
        "end-research": {
          ending: true,
          kicker: "この人生の感触",
          title: "大学は、答えより問いを増やす場所だった。",
          body: "「とりあえず進学」ではなく、「何を問い続けたいか」が見えると、四年の意味が変わる。\n気になる学問があるなら、体験授業やオープンキャンパスへ。",
          reality: [
            { label: "オープンキャンパスを調べる", href: "#reality-campus" },
            { label: "体験授業・模擬講義を探す", href: "#reality-class" }
          ]
        },
        "end-bridge": {
          ending: true,
          kicker: "この人生の感触",
          title: "学ぶことと、社会側の動きがつながった。",
          body: "大学は閉じた四年じゃない。外と往復できる時間でもある。\nこの往復が面白ければ、次は本物のキャンパスと現場を見にいこう。",
          reality: [
            { label: "気になる大学の学びを知る", href: "#reality-campus" },
            { label: "学生のプロジェクト事例を見る", href: "#reality-class" }
          ]
        }
      }
    },
    {
      id: "skill",
      label: "専門的な技術を身につける",
      hint: "手に職の感触を、短い訓練で確かめる",
      scenes: {
        start: {
          kicker: "QUEST / 専門技術",
          title: "座学より先に、道具が渡される。",
          body: "上手い下手は、すぐに画面や作品に出る。\n逃げ場は少ない。そのぶん、成長も見えやすい。",
          choices: [
            { label: "基礎を反復して、型を体に入れる", next: "basics" },
            { label: "作品を作って、外に出す", next: "portfolio" }
          ]
        },
        basics: {
          kicker: "選択のあと",
          title: "地味な反復のあと、手が勝手に動く瞬間が来る。",
          body: "才能の話より、時間の使い方の話になる。\n「できる」が増えるたびに、次の課題も増える。",
          choices: [
            { label: "資格や検定で到達点を確認する", next: "end-cert" },
            { label: "現場の課題で腕を試す", next: "end-field" }
          ]
        },
        portfolio: {
          kicker: "選択のあと",
          title: "公開した作品に、想定外の反応が来る。",
          body: "褒められるより、直したい点が見える。\n技術は、一人の完成より、誰かとの接点で磨かれる。",
          choices: [
            { label: "反応をもとに、次作へ進む", next: "end-field" },
            { label: "基礎に戻って、弱点を潰す", next: "end-cert" }
          ]
        },
        "end-cert": {
          ending: true,
          kicker: "この人生の感触",
          title: "技術は、自信を「感覚」から「根拠」に変える。",
          body: "専門性は、進路を狭めるためじゃない。選べる幅を増やすためにある。\n気になる分野があるなら、体験授業で一日触ってみてほしい。",
          reality: [
            { label: "専門学校の体験授業を探す", href: "#reality-class" },
            { label: "技術職の職場見学を調べる", href: "#reality-work" }
          ]
        },
        "end-field": {
          ending: true,
          kicker: "この人生の感触",
          title: "作ったものが、誰かの役に立つ瞬間が残った。",
          body: "技術の面白さは、上手くなることだけじゃない。届く相手が見えることにある。\nこの感触が好きなら、次は現実の工作室や現場へ。",
          reality: [
            { label: "制作・技術系のオープンキャンパスへ", href: "#reality-campus" },
            { label: "現場体験の機会を探す", href: "#reality-work" }
          ]
        }
      }
    },
    {
      id: "local",
      label: "地方で暮らす",
      hint: "都会の外側で、暮らしの密度を試す",
      scenes: {
        start: {
          kicker: "QUEST / 地方暮らし",
          title: "駅前は静かで、空が広い。",
          body: "コンビニまでの距離が、生活のリズムを変える。\n人との距離も、近い。知らないでは済まない場面が増える。",
          choices: [
            { label: "地域の仕事に関わってみる", next: "work" },
            { label: "まず暮らしの拠点を整える", next: "life" }
          ]
        },
        work: {
          kicker: "選択のあと",
          title: "仕事は「職種」より「誰の顔が見えるか」で選ばれる。",
          body: "観光、福祉、農業、行政、小さな商店。\n貢献がすぐ見えるぶん、責任の輪郭もはっきりする。",
          choices: [
            { label: "この土地で必要な仕事を引き受ける", next: "end-root" },
            { label: "外のつながりも残して、往復する", next: "end-bridge" }
          ]
        },
        life: {
          kicker: "選択のあと",
          title: "暮らしが整うと、時間が戻ってくる感覚がある。",
          body: "通勤の消耗が減る。その代わり、移動の選択肢は減る。\n何を得て、何を手放すかが、毎日の買い物みたいに具体的だ。",
          choices: [
            { label: "このペースを軸に、働き方を探す", next: "end-root" },
            { label: "都会との二拠点も試す", next: "end-bridge" }
          ]
        },
        "end-root": {
          ending: true,
          kicker: "この人生の感触",
          title: "地方は、スローな引退先じゃない。生活の設計問題だ。",
          body: "静かさと、つながりの濃さはセットで来る。\n「この町、ありかも」が残ったなら、次は短い滞在で確かめてほしい。",
          reality: [
            { label: "お試し移住・地域体験を調べる", href: "#reality-town" },
            { label: "自治体の関係人口・体験企画を見る", href: "#reality-event" }
          ]
        },
        "end-bridge": {
          ending: true,
          kicker: "この人生の感触",
          title: "住む場所は、二者択一じゃなくてもよかった。",
          body: "地方か都会か、より先に「どの距離感で生きるか」がある。\n気になる町があるなら、観光じゃない滞在で一度暮らしてみよう。",
          reality: [
            { label: "短期間の地域滞在を探す", href: "#reality-town" },
            { label: "地方の仕事体験を調べる", href: "#reality-work" }
          ]
        }
      }
    }
  ]
};
