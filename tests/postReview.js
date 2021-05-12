import http from 'k6/http';

export let options = {
  vus: 10,
  duration: '15s'
};

export default function () {
  let url = 'http://localhost:3000/reviews';
  let payload = JSON.stringify({
    product_id: 900001,
    rating: 1,
    summary: "horrible product, what a waste of money",
    body: "Absolutely horrible product. I hate this product. Really sad. XD",
    recommend: false,
    name: "hater101",
    email: "hater101@gmail.com",
    photos: ["http://newphoto.com/ihatethisproduct", "http://thisproductsucks.comhater101@gmail.com"],
    characteristics: {
      1: 2,
      2: 3,
      3: 4,
      4: 5
    }
  })

  var params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  http.post(url, payload, params);
}
