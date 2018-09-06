var generateTreeHTML = function (tree) {
    res = "<div class=\"tree\">";
    if (tree.val) 
        res = res+"<div class=\"ncontainer\"><div class=\"node\" id=\""+tree.val+"\">"+tree.val+"</div></div>";
    if (tree.children) {
        res = res + "<div class=\"children\">";
        for(child in tree.children){
            res = res + generateTreeHTML(tree.children[child]);
        }
        res = res + "</div>";
    }
    res = res + "</div>";
    return res;
}

var generateTreeSVG = function (treeObj, id, xStart, xFinish, yStart, yFinish) {
    res = '<g id="svgTree'+id+'" class="tree">';
    const spaceX = (xFinish-xStart);
    const spaceY = (yFinish-yStart);
    const ys = yStart;
    /*if(spaceX < 30 || spaceY < 30)
        return 'Not enough space for the rest of the tree';*/
    const cx = Math.floor(xStart + (spaceX / 2));
    const cy = yStart + 25;
    /*if (treeObj.val){
        res = res + '<ellipse cx="'+cx+'" cy="' + cy + '" rx="20" ry="20" />' + //TODO: edit here to match val size
            'class="svgNode" />'; 
    }*/
    if (treeObj.children) {
        res = res + '<g>';
        const ysChildren = ys + 50; 
        let xsChildren = xStart;
        const childrenSpaceX = spaceX/(Object.keys(treeObj.children)).length;
        let xfChildren = xsChildren+ childrenSpaceX;
        const ccy = ysChildren+25;
        let ccx = xsChildren+(childrenSpaceX/2);
        for(child in treeObj.children) {
            res = res + '<line x1="'+cx+'" y1="'+cy+'" x2="'+ccx+'" y2="'+ccy+'" class="svgLine"/>';
            ccx = ccx + childrenSpaceX
        }
        res = res + '<ellipse id="'+treeObj.id+'" cx="'+cx+'" cy="' + cy + '" rx="20" ry="20" ' + //TODO: edit here to match val size
            'class="svgNode" >'+
            '<animate attributeName="fill" attributeType="XML" '+
            'id="'+treeObj.id+'at" from="#3CB1FF" to="#EED922" dur="1s" begin="click" fill="freeze"/>'+
            '</ellipse>' + '<text x="'+(cx-5)+'" y="'+(cy+5)+'">'+treeObj.val+'</text>';      
        for(child in treeObj.children){
            res = res + generateTreeSVG(treeObj.children[child], id+''+child, xsChildren, xfChildren, ysChildren, yFinish);
            xsChildren = xfChildren;
            xfChildren = xfChildren + childrenSpaceX;
        }
        res = res + "</g>";
    } else {
        res = res + '<ellipse id="'+treeObj.id+'" cx="'+cx+'" cy="' + cy + '" rx="20" ry="20" ' + //TODO: edit here to match val size
            ' class="svgNode" >'+
            '<animate attributeName="fill" attributeType="XML" '+
            'id="'+treeObj.id+'at" from="#3CB1FF" to="#EED922" dur="1s" begin="click" fill="freeze"/>'+
            '</ellipse>' + '<text x="'+(cx-5)+'" y="'+(cy+5)+'">'+treeObj.val+'</text>';      
    }     
    res = res + "</g>";     
    return res;     
}     

/**
 * 
 * @param {json representation of a tree, where val is a value, id is a unique identifier and }
 * { the children is an array of json objects } tree 
 */
var getTree = function (tree) {     
    //treeObj = JSON.parse(tree);
    // var element = document.getElementById('p2');
    // var positionInfo = element.getBoundingClientRect();
    // var width = positionInfo.width;
    // console.log(width);
    // return generateTreeSVG(tree, 1, 0, width, 0, 400);
    return generateTreeSVG(tree, 1, 0, 1000, 0, 400);
}

treeE = {
    val: "A",
    id:"1",
    children: [
        {
            val: "B",
            id: "11",
            children: [
                {val: "D", id: "111"},
                {val: "E", children: [{
                    val:"H",
                    children:[{val:"M"},{val:"N"},{val:"O"}]},
                    {val:"I"}]}
            ]
        }, {
            val: "C",
            id: "12",
            children: [
                {val:"F",children: [{val:"J"}]},
                {val:"G", children: [{val:"K"}, {val:"L"}]}
            ]
        }, {
            val: "Ñ",
            id: "13"
        }
    ]
};

document.getElementById("p2").innerHTML =  getTree(treeE);
// module.exports.getTree = getTree;