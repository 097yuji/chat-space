json.array! @messages do |new_message|#コントローラで定義した@messagesをnew_messageへ入れる
  json.content  new_message.content
  json.image  new_message.image
  json.user_name  new_message.user.name
  json.created_at new_message.created_at.strftime("%Y/%m/%d %H:%M")
end
