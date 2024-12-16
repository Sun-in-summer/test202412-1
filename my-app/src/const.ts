 const DEFAULT_PRODUCTS_LIMIT = 30;
 const DEFAULT_PRODUCT_LIMIT_FOR_PAGE = 10;
 const DEFAULT_FIRST_PAGE = 1;
 const DEFAULT_TOTAL_PAGES_QTY = 3;
 const DEFAULT_URL_PATTERN =  /^(ftp|http|https):\/\/[^ "]+$/;

 enum APIRoute {
  Main ='/',
  Products = '/products',
  Product = 'products/:id',
  AddProduct = '/products/add',
  Reviews ='/comments/post/:id',

};

enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  NotFound = '/not-found'
}

export {APIRoute, AppRoute, DEFAULT_PRODUCTS_LIMIT, DEFAULT_FIRST_PAGE, DEFAULT_TOTAL_PAGES_QTY, DEFAULT_PRODUCT_LIMIT_FOR_PAGE, DEFAULT_URL_PATTERN};