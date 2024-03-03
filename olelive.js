let request = $request
let response = $response
console.log("before request:\n" + JSON.stringify(request))
console.log("before response:\n" + JSON.stringify(response))
try {
    console.log("before response.body:\n" + String.fromCharCode(...response.body))
    response.body = JSON.parse(String.fromCharCode(...response.body))
    response.body['data']['groupId'] = 3
    response.body['data']['userEndTime'] = 1809501275
    response.body = JSON.stringify(response.body)
    console.log("after request:\n" + JSON.stringify($request))
    console.log("after response:\n" + JSON.stringify(response))
    $done({
        response
    });
} catch (error) {
    console.log("error:" + error.message)
    $done({});
}