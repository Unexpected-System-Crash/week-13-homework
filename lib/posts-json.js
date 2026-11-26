//imports the useful stuff
import got from 'got';

const dataURL = "https://dev-cs-55-week-12-homework.pantheonsite.io/wp-json/wp/v2/show";


//function to get specifically the post IDs. 
// most of it is very similar to the above function
export async function getAllPostIds() {
    let jsonString;
    try {
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch(error) {
      jsonString.body = [];
      console.log(error);
    }
  
    const jsonObj = JSON.parse(jsonString.body);
  
    return jsonObj.map(item => {
      return {
        params: {
          id: item.ID.toString()
        }
      }
    });
}

//gets all of the post data from a particular post
export async function getSortedPostsData() {
    let jsonString;
    try {
        jsonString = await got(dataURL);
        
    } catch {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
    });

    return jsonObj.map(item => {
        return {
            id: item.ID.toString(),
            name: item.post_title
        }
    });
    
}

//returns the post with the specified ID
//must recieve the id parameter
export async function getPostData(id) {
    let jsonString;
    try {
        jsonString = await got(dataURL);
        
    } catch {
        jsonString.body = [];
        console.log(error);
    }
    const jsonObj = JSON.parse(jsonString.body);

    jsonObj.forEach(
        function(item) {
          let x = '{"' + item.acf_fields + '"}';
          x = x.replaceAll(',','","');
          x = x.replaceAll(':','":"');
          let y = JSON.parse(x);
          console.log(y);
          console.log(y.show_name);
          item.acf_fields = y;
        }
      );

    const objReturn = jsonObj.filter(obj => {
        return obj.ID.toString() === id;
    });

    let objReturning;
    if (objReturn.length > 0) {
        objReturning = objReturn[0];
    } else {
        objReturning = {};
    }

    return objReturning;


}