const productDOM = document.querySelector('.products-list');
const filterForm = document.querySelector('.filter-form');
const searchInput = document.querySelector('.search-name')
const productsTotal = document.querySelector('.products-total')
const checkCompany = document.querySelectorAll('input[name="company-name"]')
const range = document.querySelector('.range')
const sortBy = document.getElementById('sort-by');


const obj = {
	name: '',
	company: '',
	numericFilters: '',
	sort: ''
};
const showProducts = async (param,value) => {
	try {
		obj[param] = value;
		console.log(obj);
		const res= await axios.get(`https://test-express-server-topaz.vercel.app/api/v1/products/`, {params: obj})

		const {products} = res;
		if(products.length <1){
			productDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
			return
		}
		const allProducts = products.map((product)=>{
			const {name,company,_id: taskID,rating,price} = product
			return `<div class="product" id="${taskID}">
				<div class="img-box"></div>
				<h4>${name}</h4>
				<h5>${price} $</h5>
				<p>${company}</p>
			</div>`
		}).join('')
		productDOM.innerHTML = allProducts
		productsTotal.innerText = `${products.length} products found`
		let rangeArr = products.map(product=>product.rating)

	} catch (error) {
		console.log(error);
		productDOM.innerHTML = '<h5 class="empty-list" >There was an error,plase try later...</h5>'
	}
}
showProducts()

searchInput.addEventListener('input', async (e)=>{
	e.preventDefault()
	const value = e.target.value
	showProducts('name',value)
})

for (let i = 0; i < checkCompany.length; i++) {
	const company = checkCompany[i];
	company.addEventListener('input', (e)=>{
		e.preventDefault()
		const value = e.target.value;
		showProducts('company',value)
	})
}

range.addEventListener('change', (e)=>{
	e.preventDefault()	
	const value = 'rating='+ e.target.value
	showProducts('numericFilters',value)
	
})

sortBy.addEventListener('input', (e)=>{
	e.preventDefault()
	const value = e.target.value;
	showProducts('sort', value)
})