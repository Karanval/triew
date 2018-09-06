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

var generateTreeSVG = function (treeObj, id, xStart, xFinish, yStart, levels) {
    let res = '<g id="svgTree' + id + '" class="tree">';
    const spaceX = (xFinish - xStart);
    const spaceY = 500 / levels;
    console.log("levels"+levels +" space y; "+  spaceY);
    const ys = yStart;
    
    // Center values
    const cx = Math.floor(xStart + (spaceX / 2));

    // const cy = yStart + 25;
    const cy = yStart + (spaceY / 2);
    
    if (treeObj.children) {
        res = res + '<g>';
        // const ysChildren = ys + 50; 
        const ysChildren = ys + spaceY; 
        let xsChildren = xStart;
        // Divided in the ammound of child nodes
        const childrenSpaceX = spaceX / (Object.keys(treeObj.children)).length;
        let xfChildren = xsChildren+ childrenSpaceX;
        // const ccy = ysChildren+25;
        const ccy = ysChildren + (spaceY / 4);
        let ccx = xsChildren+(childrenSpaceX/2);
        for(child in treeObj.children) {
            res = res + '<line x1="'+cx+'" y1="'+cy+'" x2="'+ccx+'" y2="'+ccy+'" class="svgLine"/>';
            ccx = ccx + childrenSpaceX
        }
        res = res + this.getEllipse(cx, cy, (cx-5), (cy+5), treeObj.val, treeObj.id);
        for(child in treeObj.children){
            res = res + generateTreeSVG(treeObj.children[child], id+''+child, xsChildren, xfChildren, ysChildren);
            xsChildren = xfChildren;
            xfChildren = xfChildren + childrenSpaceX;
        }
        res = res + "</g>";
    } else { 
        res = res + this.getEllipse(cx, cy, (cx-5), (cy+5), treeObj.val, treeObj.id);
    }     
    res = res + "</g>";     
    return res;     
}     

function getEllipse(cx, cy, x, y, val, id) {
    //TODO: edit here to match val size
    return  '<ellipse id="' + id + '" cx="' + cx + '" cy="' + cy + '" rx="20" ry="20" ' + 
            'class="svgNode" >'+
            '<animate attributeName="fill" attributeType="XML" '+
            'id="' + id + 'at" from="#3CB1FF" to="#EED922" dur="1s" begin="click" fill="freeze"/>'+
            '</ellipse>' + '<text x="' + x + '" y="' + y + '">' + val + '</text>'; 
}

function getLevelCount(treeObj) {
    let count = 1;
    if (treeObj.children) {
        let may = 0, cu;
        treeObj.children.forEach(child => {
            cu = getLevelCount(child);
            if (may < cu) 
                may = cu; 
        });
        count += may;
    }
    return count;
}

/**
 * 
 * @param {json representation of a tree, where val is a value, id is a unique identifier and }
 * { the children is an array of json objects } tree 
 */
var getTree = function (tree) {     
    let count = getLevelCount(tree);
    return generateTreeSVG(tree, 1, 0, 800, 0, count);
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