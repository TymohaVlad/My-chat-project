// 
function initialise() {

    loadMessagesFromLocalStorage();

    initialiseListeners();
}



function loadMessagesFromLocalStorage() {

    const messagesJson = window.localStorage.getItem('messages');


    if (!messagesJson) {
        return
    }


    
    const messages = JSON.parse(messagesJson);
    
    if (messages.length > 0) {
        hideNoMessageNotification();
    }

    
    const messageHtmlElements = messages.map(createArticleFromMessage);
   
    const chatWindow = document.getElementById("chat-messages-window");
    
    messageHtmlElements.forEach(function (el) {
        
        chatWindow.appendChild(el);
    });

    for (i = 0; i < messageHtmlElements.length; i++) {
        chatWindow.appendChild(messageHtmlElements[i])
    }

}


function createArticleFromMessage(message) {
    
    const avatar = document.createElement("img");
    
    avatar.classList.add("chat-message__avatar");
    
    avatar.setAttribute("src", "./img/" + message.author + ".jpg")

    
    const messageBlock = document.createElement("div");
    
    messageBlock.classList.add("chat-message__text");
    
    messageBlock.innerText = message.text;


   
    const messageElement = document.createElement("article");
    
    messageElement.classList.add("chat-component");
    messageElement.classList.add("chat-message");
   
    if ("me" == message.author) {
        
        messageElement.classList.add("my-chat-message");
    }
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(messageBlock);
  
    return messageElement;
}

function initialiseListeners() {
    
    const sendMessageForm = document.getElementById("send-message-form");
   
    sendMessageForm.addEventListener("submit", function (event) {
       
        event.preventDefault();
        
        const newMesasgeInput = document.getElementById("new-message-input");
       
        const messageText = newMesasgeInput.value;
        
        const message = { text: messageText, author: "me" };
        
        sendNewMessage(message);
       
        newMesasgeInput.value = null;
    });
}

function hideNoMessageNotification() {
    
    const noMessagesNotification = document.getElementById("no-messages-notification");
    
    noMessagesNotification.classList.add("hidden");
}

function sendMessageAsFriend() {
    
    const message = { text: "some message from friend", author: "friend" };
    sendNewMessage(message);
}

function sendNewMessage(message) {
    
    hideNoMessageNotification();
    
    const messagesJson = window.localStorage.getItem('messages');
    
    if (messagesJson == null || messagesJson == "") {
        
        window.localStorage.setItem("messages", JSON.stringify([message]))
    } else {
        
        const messagesArray = JSON.parse(messagesJson);
        
        messagesArray.push(message);
        
        window.localStorage.setItem("messages", JSON.stringify(messagesArray))
    }

    const messageHtmlElement = createArticleFromMessage(message);
    
    document.getElementById("chat-messages-window").appendChild
        (messageHtmlElement);
}