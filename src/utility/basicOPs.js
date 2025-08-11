export default function basicOps(products,searchTerm,sortDir,currCategory,pageNum,pageSize){
    if (products==null){
        return;
    }



let filteredArr=products;
    if (searchTerm!=""){
        filteredArr=filteredArr.filter((product)=>{
            let lowerTitle = product.title.toLowerCase();
            let lowerSearchTerm = searchTerm.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm)
    })
    }

    let filteredSortedArr = filteredArr;
    if (sortDir!=0){
        if (sortDir==1){
            filteredSortedArr=filteredSortedArr.sort(aO)
        }
        else{
            filteredSortedArr=filteredSortedArr.sort(dO)
        }
    }

    let filteredSortedGroupArr= filteredSortedArr;
    if(currCategory!="All categories"){
        filteredSortedGroupArr= filteredSortedGroupArr.filter((products)=>{
            return products.category == currCategory;
        })
    }
    
    //pagenation
    let totalPages = filteredSortedGroupArr.length/pageSize;
    let sidx = (pageNum-1)*pageSize;
    let eidx = sidx+pageSize;
    filteredSortedGroupArr = filteredSortedGroupArr.slice(sidx,eidx)

    return{filteredSortedGroupArr,totalPages}
    


}

function aO(product1,product2){
    if (product1.price> product2.price){
        return 1
    }
    else{
        return -1
    }

}

function dO(product1,product2){
    if (product1.price< product2.price){
        return 1
    }
    else{
        return -1
    }
}