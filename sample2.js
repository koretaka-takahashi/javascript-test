$(document).ready(function(){
  // 各教科の得点を収集して配列にまとめる関数です。
  // この関数を定義しておくことによって、何度も同じNumber(...)の記述をせずにすみます。
  function set_points(){
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];
    return subject_points;
  };

  // 合計点と平均点を出す処理をまとめたメソッドです。
  function score_indicate(){
    let sum, subjects;
    [sum, subjects] = sum_score();
    avarage_score(sum, subjects);
  };

  // 合計点を出し、指定のHTMLの部分に出力するメソッドです。
  function sum_score(){
    let sum;
    const subjects = 5;
    // reduceを使うことで、短い記述で合計値計算ができます
    sum = set_points().reduce(function(arr, content) { return arr + content; });
    $('#sum_indicate').text(sum);
    return [sum, subjects];
  };

  // 平均点を出し、指定のHTMLの部分に出力するメソッドです。
  function avarage_score(sum, subjects){
    let ava = Math.round(sum / subjects)
    $('#avarage_indicate').text(ava);
  };

  // ランクを出力するメソッドです。演習とほぼ同じですが、returnをどこにつけるかに気をつけてください。
  function get_achievement(){
    let sum, subjects, evaluation;
    [sum, subjects] = sum_score()
    if (sum >= subjects * 100 * 0.8){
      evaluation = "A";
    }else if (sum >= subjects * 100 * 0.6){
      evaluation = "B";
    }else if (sum >= subjects * 100 * 0.4){
      evaluation = "C";
    }else {
      evaluation = "D";
    }
    $('#evaluation').text(evaluation);
    return evaluation
  }

  // 合否判定を出力するメソッドです。演習とほぼ同じですが、returnをどこにつけるかに気をつけてください。
  function get_pass_or_failure(){
    let points = set_points();
    let judge = "合格";
    for(let i = 0, l = points.length; i < l; i++){
      if(points[i] < 60){  
        judge = "不合格";
        break;
      }
    };
    $('#judge').text(judge);
    return judge;
  }

  // 最終判定の文章を出力するメソッドです。演習をご参考ください。
  function judgement(){
    let achievement = get_achievement();
    let pass_or_failure =  get_pass_or_failure();
    // この一文で、最終判定のボタンが二回押されても、文章が二つ出ないようにしています（すでに文章があればそれを消してから新しいものを作成しています）。
    if (document.getElementById("alert-indicate") != null){ $('#alert-indicate').remove(); }
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${pass_or_failure}です</label>`);
  };

  // 点数入力欄のどれかが変更されたら、score_indicateメソッドを起動させます
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });

  // btn-evaluationが押されたら、get_achievementメソッドを起動させます
  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  // btn-judgeが押されたら、get_pass_or_failureメソッドを起動させます
  $('#btn-judge').click(function() {
    get_pass_or_failure();
  });

  // btn-declarationが押されたら、judgementメソッドを起動させます
  $('#btn-declaration').click(function() {
    judgement();
  });
});