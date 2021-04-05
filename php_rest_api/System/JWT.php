<?php
namespace JWT;
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
};
function base64url_decode($data) {
    return base64_decode(str_replace(array('-', '_'), array('+', '/'), $data));
};

class JWT {

    public static function encode($payload, $key)
    {
        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers_encoded = base64url_encode(json_encode($headers));
        $payload_encoded = base64url_encode(json_encode($payload));
        $signature = hash_hmac('sha256',"$headers_encoded.$payload_encoded",$key,true);
        $signature_encoded = base64url_encode($signature);
        $token = "$headers_encoded.$payload_encoded.$signature_encoded";
        return $token;
    }
    public static function decode($token)
    {
        return json_decode(base64url_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
    }
    public static function verify(string $token, string $key): bool
    {
        [$headerEncoded, $bodyEncoded, $signatureEncoded] = explode('.', $token);
        $signature = base64url_decode($signatureEncoded);

        $hash = hash_hmac('sha256', implode('.', [$headerEncoded, $bodyEncoded]), $key, true);

        return \hash_equals($signature, $hash);
    }
}



