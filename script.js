const products=[
{id:1,name:"Classic Wooden Wall Decor",cat:"decor",price:1499,img:"https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80"},
{id:2,name:"Handcrafted Wooden Side Table",cat:"furniture",price:4999,img:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80"},
{id:3,name:"Solid Wood Coffee Table",cat:"furniture",price:8999,img:"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=900&q=80"},
{id:4,name:"Wooden Elephant Wall Art",cat:"decor",price:1899,img:"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80"},
{id:5,name:"Premium Wooden Chair",cat:"furniture",price:5999,img:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80"},
{id:6,name:"Wooden Bedside Table",cat:"furniture",price:5499,img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80"},
{id:7,name:"Minimal Wooden Wall Shelf",cat:"decor",price:1299,img:"https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80"},
{id:8,name:"Rustic Wooden Tray",cat:"decor",price:999,img:"https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=900&q=80"}];
let cart=JSON.parse(localStorage.getItem("shyamsarts-cart")||"[]");
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function renderProducts(){let c=document.getElementById("category").value;document.getElementById("products").innerHTML=products.filter(p=>c==="all"||p.cat===c).map(p=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-info"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="advance-text">20% advance: ${money(p.price*.2)}</div><button class="add" onclick="add(${p.id})">Add to Cart</button></div></article>`).join("")}
function add(id){cart.push(products.find(p=>p.id===id));save();openCart()}
function remove(i){cart.splice(i,1);save();renderCart()}
function save(){localStorage.setItem("shyamsarts-cart",JSON.stringify(cart));renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.length;let total=cart.reduce((s,p)=>s+p.price,0);document.getElementById("total").textContent=money(total);document.getElementById("advance").textContent=money(total*.2);document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><img src="${p.img}"><div><b>${p.name}</b><br>${money(p.price)}<br><button class="remove" onclick="remove(${i})">Remove</button></div></div>`).join(""):"<p>Your cart is empty.</p>"}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open");renderCart()}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function checkout(){if(!cart.length)return alert("Please add a product first.");let total=cart.reduce((s,p)=>s+p.price,0);document.getElementById("fTotal").textContent=money(total);document.getElementById("fAdvance").textContent=money(total*.2);document.getElementById("freeCheckout").classList.add("open")}
function closeFreeCheckout(){document.getElementById("freeCheckout").classList.remove("open")}
function sendFreeOrder(){
 if(!fName.value||!fPhone.value||!fAddress.value)return alert("Please fill all details.");
 let total=cart.reduce((s,p)=>s+p.price,0), advance=Math.round(total*.2);
 let text=`Hello ShyamSArts,%0A%0AI want to place an order.%0AName: ${encodeURIComponent(fName.value)}%0AMobile: ${encodeURIComponent(fPhone.value)}%0AAddress: ${encodeURIComponent(fAddress.value)}%0A%0AProducts:%0A${cart.map(p=>"- "+encodeURIComponent(p.name)+" - "+money(p.price)).join("%0A")}%0A%0ATotal: ${money(total)}%0A20%25 Advance: ${money(advance)}%0A%0APlease share UPI/payment details.`;
 window.open("https://wa.me/919785900197?text="+text,"_blank");
}
function contactWhatsApp(){window.open("https://wa.me/919785900197?text=Hello%20ShyamSArts%2C%20I%20have%20an%20enquiry.","_blank")}
renderProducts();renderCart();