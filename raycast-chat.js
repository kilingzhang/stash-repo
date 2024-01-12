let request = $request
let body = $request.body
let url = request.url
let headers = request.headers
let messages = []
let temperature = 0.5;
console.log("before request:\n" + JSON.stringify(request))
const options = {
    OPENAI_API_KEY: '',
    OPENAI_API_PROXY: ''
};
if (typeof $argument !== 'undefined' && $argument !== '') {
    try {
        const params = Object.fromEntries($argument.split('&').map(item => item.split('=')));
        Object.assign(options, params);
    } catch (error) {
        $notification.post("raycast", 'argument 解析失败', error.message)
        $done({});
    }
}
const {OPENAI_API_KEY, OPENAI_API_PROXY} = options;
// console.log(`OPENAI_API_KEY:${OPENAI_API_KEY},OPENAI_API_PROXY:${OPENAI_API_PROXY}`);
try {
    body = JSON.parse(body)
    switch (url) {
        case "https://backend.raycast.com/api/v1/ai/chat_completions":
            headers = {}
            headers['Authorization'] = `Bearer ${OPENAI_API_KEY}`
            headers['Content-Type'] = 'application/json'
            for (let msg of body["messages"]) {
                if ("system_instructions" in msg["content"]) {
                    messages.push({
                        role: "system",
                        content: msg["content"]["system_instructions"],
                    });
                }
                if ("command_instructions" in msg["content"]) {
                    messages.push({
                        role: "system",
                        content: msg["content"]["command_instructions"],
                    });
                }
                if ("additional_system_instructions" in body) {
                    messages.push({
                        role: "system",
                        content: body["additional_system_instructions"],
                    });
                }
                if ("text" in msg["content"]) {
                    messages.push({role: "user", content: msg["content"]["text"]});
                }
                if ("temperature" in msg["content"]) {
                    temperature = msg["content"]["temperature"];
                }
            }

            request = {
                url: OPENAI_API_PROXY,
                headers: headers,
                body: JSON.stringify({
                    "model": body["model"],
                    "messages": messages,
                    "temperature": temperature
                }),
            }
            console.log("after request:\n" + JSON.stringify(request))
            $httpClient.post(
                request,
                (error, response, data) => {
                    if (error) {
                        console.log("catch error : " + error.message)
                        $done({});
                    } else {
                        console.log("OpenAI response finish:\n" + data)
                        data = JSON.parse(data)
                        data = `data: ${JSON.stringify({"text": data['choices'][0]['message']['content']})}\n\ndata: ${JSON.stringify({
                            "text": "",
                            "finish_reason": 'length'
                        })}\n\n`
                        console.log("stream:\n" + data)
                        $done({
                            response: {
                                status: 200,
                                headers: {"Content-Type": "text/event-stream"},
                                body: data,
                            }
                        });
                    }
                }
            )
            break;
    }
} catch (error) {
    console.log("catch error : " + error.message)
    $done({});
}
