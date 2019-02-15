## ServerlessMailService

A serverless cloud function to send emails by lambda invoke for dead simple client side forms.

### Example Client Implementation using Axios

```javascript
import jwt from "jsonwebtoken";
import axios from "axios";

const formToken = formValues => jwt.sign(formValues, `${YourLambdaJWTSecret}`).toString();

axios.post(`${YourLambdaURL}`, { payload: formToken });
```

### Example Client Implementation using Fetch

```javascript
import jwt from "jsonwebtoken";

const formToken = formValues => jwt.sign(formValues, `${YourLambdaJWTSecret}`).toString();

fetch(`${YourLambdaURL}`, {
  method: "POST",
  body: JSON.stringify({ payload: formToken }),
});
```

### Example Form Values

```json
{
  "to": "john@example.com",
  "from": "greg@example.com",
  "cc": "dave@example.com",
  "bcc": "bob@example.com",
  "replyTo": "phil@example.com",
  "subject": "Hah! Made you look!",
  "body": "<h1>Hello John!</h1><br/><p>This mail was sent using λ</p>"
}
```

### Example HTTP Payload

```json
{
  "payload": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0byI6Im9ycmlhcm5hcnNAZ21haWwuY29tIiwiZnJvbSI6Im9ycmlhQHNlbmRpcmFkaWQuaXMiLCJjYyI6ImFuZHJpQHNlbmRpcmFkaWQuaXMiLCJiY2MiOiJiaXJnaXJAc2VuZGlyYWRpZC5pcyIsInJlcGx5VG8iOiJoYWxsb0BzZW5kaXJhZGlkLmlzIiwic3ViamVjdCI6IkhhaCEgTWFkZSB5b3UgbG9vayEiLCJib2R5IjoiPGgxPkfDs8OwYW4gZGFnaW5uITwvaDE-PGJyLz48cD7DnmVzc2kgcMOzc3R1ciB2YXIgc2VuZHVyIG1lw7Agzrs8L3A-In0.llaSAEeVFgL-zS0d2GfIjwKdGSzHxp-LpN42Mjb4EKU"
}
```
