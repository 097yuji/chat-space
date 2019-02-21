$(function(){
  function appendUser(user){//名前があった時
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendGruop(name,user_id){//名前がなかった時
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix' id='chat-group-user-22'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>
                </div>`
    $('#user-search-result').append(html);
  }

  $('#user-search-field').on('keyup',function(){//keyupは入力し始めたら発火
    var input = $(this).val();//入力した値をinputへ代入
    $.ajax({
      type:     'GET',
      url:      '/users',
      data:     {name: input},
      dataType: 'json'
    })
    .done(function(users){//jbuilderのデータ
      $('#user-search-result').empty();//子要素のみ消す。一旦消すよ
        users.forEach(function(user){//usersはユーザーデータ複数セット、userはユーザー単品
          appendUser(user);
        });
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click','.user-search-add',function(){//documentはhtmlのbodyとかああいうやつ。user-search-addは上のhtmlにあるよ
    var name = $(this).attr('data-user-name');
    var user_id = $(this).attr('data-user-id');
    $(this).parent().remove()//グループ追加後に候補からの削除。親要素を消す。ここでは上のclearfixクラス。
    appendGruop(name,user_id);
  })

  $(document).on('click','.user-search-remove',function(){
    $(this).parent().remove();//削除ボタン押下後に消える
  })
})
