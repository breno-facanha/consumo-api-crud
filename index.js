async function listarProduto(){
    let url = 'http://localhost:3000/post'

    try {     
        const response = await fetch(url)
        const products = await response.json()
        let arrayComDados  = products.map( products => 
            `
            <tr class="align-baseline">
                <th scope="row">${products.id}</th>
                <td>${products.title}</td>
                <td>${products.price}</td>
                <td>${products.category}</td>
                <td><img src="${products.image}" alt=""></td>
                <td>${products.rating.rate}</td>
                <td><button id="btnExcluir" type="button" onclick="clicou('${products.id}', '${products.title}')" value=${products.id} class="btn btn-danger">x</button></td>
                <td><button id="btnEditar" type="button" onclick="clicou2('${products.id}', '${products.title}', '${products.price}', '${products.category}', '${products.image}', '${products.rating.rate}')" value=${products.id} class="btn btn-primary">E</button></td>
                
            </tr>
            `
        )
        
        document.getElementById('resultado').innerHTML = arrayComDados.join("")

       
    } catch (error) {
        console.log(error)
    }
    
}

async function criarProduto(product){
    try {
        const params = {
            method:"POST",
            body:JSON.stringify(product),
        }
        await fetch('http://localhost:3000/post', params)
        .then(res=>res.json())
        .then(json=>console.log(json))
        // alert(`Produto cadastrado ${JSON.stringify(product)}`)
    }
        
     catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", function(){
    listarProduto()

    document.getElementById('form-new-product').onsubmit = async (e) => {
        e.preventDefault()

        const product = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            category: document.getElementById('category').value,
            image: document.getElementById('image').value,
            rating: {
                rate: document.getElementById("rating").value
              },
            }

        criarProduto(product)
        }
})

function clicou(idProduto, nomeProduto){
    const confirmado = confirm(`Deseja deletar produto: ${nomeProduto}`)
    if(confirmado == true){
        alert(` ID: ${idProduto} \n PRODUTO: ${nomeProduto} EXCLUIDO COM SUCESSO `)
        fetch(`http://localhost:3000/post/${idProduto}`,{
            method:"DELETE"
        })
    }
    console.log(confirmado)
}

function clicou2(id, title, price, category, image, rate){
    new bootstrap.Modal("#form-produto-update").show();
    
        console.log(id)
        document.getElementById('title-update').value = title
        document.getElementById('price-update').value = price
        document.getElementById('category-update').value = category
        document.getElementById('image-update').value = image
        document.getElementById('rating-update').value = rate
}