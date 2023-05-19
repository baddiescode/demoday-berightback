var add = document.getElementsByClassName("add");

console.log("Hello")

Array.from(add).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const picture = this.parentNode.parentNode.childNodes[3].childNodes[0].src
        const type = this.parentNode.parentNode.childNodes[5].innerText
        const rating = this.parentNode.parentNode.childNodes[7].innerText
        const price = this.parentNode.parentNode.childNodes[9].innerText
        const address = this.parentNode.parentNode.childNodes[11].innerText
        const phone = this.parentNode.parentNode.childNodes[13].innerText

        console.log(name, picture, type, rating, price, address, phone)

        // fetch('/', {
        //   method: 'post',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify({
        //     'name': name,
        //     'picture': picture,
        //     'type': type,
        //     'rating': rating,
        //     'price': price,
        //     'address': address,
        //     'phone': phone
        //   })
        // })
        // .then(response => {
        //   if (response.ok) return response.json()
        // })
        // .then(data => {
        //   console.log(data)
        //   window.location.reload(true)
        // })
      });
});