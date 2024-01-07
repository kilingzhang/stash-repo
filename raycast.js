let request = $request
let response = $response
console.log("before request:\n" + JSON.stringify(request))
console.log("before response:\n" + JSON.stringify(response))
try {
    response.body = JSON.parse(response.body)
    switch (request.url) {
        case "https://backend.raycast.com/api/v1/me":
            response.body['eligible_for_pro_features'] = true
            response.body['has_active_subscription'] = true
            response.body['eligible_for_ai'] = true
            response.body['eligible_for_gpt4'] = true
            response.body['eligible_for_ai_citations'] = true
            response.body['eligible_for_developer_hub'] = true
            response.body['eligible_for_application_settings'] = true
            response.body['publishing_bot'] = true
            response.body['has_pro_features'] = true
            response.body['has_better_ai'] = true
            response.body['can_upgrade_to_pro'] = true
            response.body['admin'] = true
            break;
        case "https://backend.raycast.com/api/v1/me/trial_status":
            response.body['organizations'] = []
            response.body['trial_limits']['commands_limit'] = 999
            response.body['trial_limits']['quicklinks_limit'] = 999
            response.body['trial_limits']['snippets_limit'] = 999
            break;
    }
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
