
/**
 * 
 * @param {array of ordered ids to change color} treeNodes 
 */
async function traverse (treeNodes) {
    console.log("clicked");
    for(index in treeNodes) {
        console.log("animate ide: "+treeNodes[index]+'at');
        //document.getElementById(treeNodes[index]).style.fill="blue";
        document.getElementById(treeNodes[index]+'at').beginElement();//Uncomment
        await sleep(500);
    }
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}


function setTreeView(tree) {
    document.getElementById("p2").innerHTML=tree;
}