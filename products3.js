import{createApp}from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const site=`https://vue3-course-api.hexschool.io/v2/`;
const api_path='debbiewang';
let productModal={};
let delProductModal={};

const app = createApp({
    data() {
        
        return {  
            products:[], //定義資料,預備取得資料
            tempProducts:{
                
                imagesUrl:[],
            }  //暫存用: click點選查看商品細節,裡面資料暫存入tempProducts
        }
            isNew:false;
        },
    methods: {
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)debbiewang\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(token);
        const url=`${site}api/user/check`;
        axios.post(url)
        .then(()=>
        { this.getProducts();
        })
        .catch((err)=>{
            console.log(err);
        });
       

        },
        getProducts(){
            const url=`${site}/api/${api_path}/admin/products/all`;
            axios.get(url)
            .then((res)=>{
                this.products=res.data.products; 
                console.log(res);    
                //  console.log(Object.values( this.products));  //物件變陣列
            //     Object.values( this.products).forEach((item)=>{console.log(item);  //物件跑迴圏            
            //     })
            });
        
        },
        openModal(status,product){
            console.log(status,product);
            if(status==='isNew'){
                this.tempProducts={
                    imagesUrl:[],
                },
                productModal.show(); 
                this.isNew=true;
            } else if (status==='edit'){
                this.tempProducts={...product};
                productModal.show(); 
                this.isNew=false;
            } else if (status==='delete'){
                this.tempProducts={...product};
                delProductModal.show(); }
    },
    updateProduct(){
    let url=`${site}api/${api_path}/admin/product`;
    let methods='post';
    if(!this.isNew){
        url=`${site}api/${api_path}/admin/product/${this.tempProducts.id}`;
        methods='put';
    }

    axios[methods](url,{data:this.tempProducts})
    .then((res)=>{
        console.log(res);

        this.getProducts();    
        productModal.hide();
 } );        
    },
    delProducte(){
        let url=`${site}api/${api_path}/admin/product/${this.tempProducts.id}`;  
        axios.delete(url,{data:this.tempProducts})
        .then((res)=>{
            console.log(res);
    
            this.getProducts();    
            delProductModal.hide();
     } ); 
    }
},  
        //  console.log(Object.values( this.products));  //物件變陣列
    //     Object.values( this.products).forEach((item)=>{console.log(item);  //物件跑迴圏            
    //     })
 

    mounted() {
        this.checkLogin();
        productModal= new bootstrap.Modal(document.getElementById('productModal'));
        productModal.hide();
        delProductModal= new bootstrap.Modal(document.getElementById('delProductModal'));
        // delProductModal.show();
    },
        
});
app.mount('#app');


//1.productModal--> bootstrap 建立modal 實體......,document.getElementById('productModal')
//2.openModal();

//modal 開啟後 3秒 結束 --> productModal.show();
                      //  setTimeout(()=>{
                      //  productModal.hide()
                      //  },3000);

 //3.綁數字 (.number):  v-model.number="tempProducts.price"
//4. 做多圖  imagesUrl:[],