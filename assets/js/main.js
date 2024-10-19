const getCategory = async () => {
  const { data } = await axios.get(
    "https://dummyjson.com/products/category-list"
  );
  return data;
};
const displayCategory = async () => {
  const loader=document.querySelector('.loader')
  try{
    loader.classList.remove('hidden')
    const data = await getCategory();
    const content = data
    .map((category) => `<div class='category-content'>
    <h3>${category}</h3>
    <a href='category.html?category=${category}'>show details</a>
    </div>`)
    .join("");
    document.querySelector(".category .row").innerHTML = content;
    console.log('category')
  }catch(e){
    document.querySelector(".category .row").innerHTML ='<p>somthing wrong</p>'
  }finally{
    
    document.querySelector('.loader').classList.add('hidden')
  }
  
};
displayCategory();
const getProduct=async(numPage)=>{
    const skip= (numPage-1)*20
    console.log(skip)
    const {data}=await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`)
    return data;
}
let pre;
const displayProduct=async (page,ele)=>{
  const loader=document.querySelector('.loader')
    if(ele=='button' && page ==pre)
      return;
    try{
      loader.classList.remove('hidden')
      const data=await getProduct(page);
      const numberogPage=Math.ceil(data.total/20)
      const content=data.products.map((product)=>`<div class='product-content'>
      <img  src="${product.thumbnail}" alt="${product.title}">
      <h3 onclick="display('${product.title}')">${product.title}</h3>
      </div>`).join('')
      document.querySelector('.product .row').innerHTML=content;
      //paginaton  logic
      let number=''
      if(page>1)
        number=`<button onclick="displayProduct(${page-1})">&laquo;</button>`
      for(let i=1;i<=numberogPage;i++)
        number+=`<button class="${page==i?"active":""}" onclick="displayProduct(${i},'button')">${i}</button>`;
      if(page!=numberogPage)
        number+=`<button onclick="displayProduct(${page+1})">&raquo;</button>`
      document.querySelector('.pagination-content').innerHTML=number;
      //prevent make request
      pre=page;
    }catch(e){
      document.querySelector(".category .row").innerHTML ='<p>somthing wrong</p>'
    }
    finally{
      loader.classList.add('hidden')
    }
}
displayProduct(1)
