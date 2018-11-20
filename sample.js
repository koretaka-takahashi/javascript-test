$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points[0];
    sum = sum + subject_points[1];
    sum = sum + subject_points[2];
    sum = sum + subject_points[3];
    sum = sum + subject_points[4];
    $("#sum_indicate").text(sum);

        // ここに、上記を参考にして平均点を出力する処理を書き込む
    let avarage_mark = sum/subject_points.length;
    $("#avarage_indicate").text(avarage_mark);
    return avarage_mark;//これがないと計算するだけで結果を教えてくれない
  };

  function get_achievement(){
    let avarage_mark = score_indicate();
    let rank = "";
      if (avarage_mark >= 80) {rank = "A"}
      else if (avarage_mark >= 60) {rank = "B"}
      else if (avarage_mark >= 40) {rank = "C"}
      else {rank = "D"}
      $("#evaluation").text(rank);
      return rank;
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
  }

  function get_pass_or_failure(){
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    let number = subject_points.length;
    let judge = "合格";
    console.log(number);
    console.log(judge);
    for(let i=0; i<number; i++){
      console.log(subject_points[i]);
        if(subject_points[i]<60){
            judge= "不合格";
            break;
        }
    
    }
    $("#judge").text(judge);
    return judge;
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
  }
  

  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績はの値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${get_achievement()}です。${get_pass_or_failure()}です</label>`);
  };

  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
    console.log(score_indicate());
  });
  

  $('#btn-evaluation').click(function() {
    get_achievement();
    console.log(get_achievement());
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
});
