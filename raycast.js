let request = $request
let response = $response
let url = request.url
console.log("before request:\n" + JSON.stringify(request))
console.log("before response:\n" + JSON.stringify(response))
try {
    response.body = JSON.parse(response.body)
    switch (url) {
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
            response.body['eligible_for_cloud_sync'] = true
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
        case "https://backend.raycast.com/api/v1/ai/models":
            response.body['models'] = [
                {
                    "id": "gemini-pro",
                    "model": "gemini-pro",
                    "name": "Gemini Pro",
                    "provider": "google",
                    "provider_name": "Google",
                    "requires_better_ai": true,
                    "features": [],
                },
            ]
            response.body['models'] = [
                {
                    "id": "openai-gpt-3.5-turbo",
                    "model": "gpt-3.5-turbo",
                    "name": "GPT-3.5 Turbo",
                    "provider": "openai",
                    "provider_name": "OpenAI",
                    "requires_better_ai": true,
                    "features": [],
                },
                {
                    "id": "openai-gpt-4-1106-preview",
                    "model": "gpt-4-1106-preview",
                    "name": "GPT-4 Turbo",
                    "provider": "openai",
                    "provider_name": "OpenAI",
                    "requires_better_ai": true,
                    "features": [],
                },
            ]
            response.body['default_models'] = {
                "chat": "openai-gpt-3.5-turbo",
                "quick_ai": "openai-gpt-3.5-turbo",
                "commands": "openai-gpt-3.5-turbo",
                "api": "openai-gpt-4-1106-preview",
            }
            break;
    }
    response.body = JSON.stringify(response.body)
    console.log("after request:\n" + JSON.stringify(request))
    console.log("after response:\n" + JSON.stringify(response))
    $done({
        response
    });
} catch (error) {
    console.log("catch error : " + error.message)
    $done({});
}
