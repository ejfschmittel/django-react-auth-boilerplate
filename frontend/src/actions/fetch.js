
//https://stackoverflow.com/questions/35417507/how-to-make-a-global-error-handler-in-redux-and-override-it-when-needed

const defaultOptions = {
    method: 'GET',
    mode: "cors",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',  
    },
}


const checkResponseStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(response.statusText)
        error.response = response   
        throw error
    }    
}

const parseJSON = (response) => {
    return response.json()
}

export const cfetch = (url, options, data=undefined) => {
    let finalOptions = {
        ...defaultOptions,
        ...options,
    }

    if(finalOptions.method === "GET" && data){
        throw new Error("can't send data via GET request!")
    }else if(data){
        finalOptions = {
            ...finalOptions,
            body: JSON.stringify(data)  
        }
    }


    console.log(finalOptions)

    return fetch(url, finalOptions)
        .then(checkResponseStatus)
        .then(parseJSON)
}



export const get = (url, options, data=undefined) => cfetch(url, {...options, method:"GET"}, data)
export const post = (url, options, data=undefined) => cfetch(url, {...options, method:"POST"}, data)
export const update = (url, options, data=undefined) => cfetch(url, {...options, method:"UPDATE"}, data)
export const put = (url, options, data=undefined) => cfetch(url, {...options, method:"PUT"}, data)
export const patch = (url, options, data=undefined) => cfetch(url, {...options, method:"PATCH"}, data)
//export const delete = (url, options, data=undefined) => cfetch(url, {...options, method:"DELETE"}, data)


const getAuthHeaders = () => {
    
}


/*
export function submitForm(data) {
    return dispatch => post('/myform', data).then(
      response => dispatch({
        type: 'SUBMIT_FORM_SUCCESS',
        payload: response
      }),
      error => dispatch({
        type: 'SUBMIT_FORM_FAILURE',
        error: error,
        suppressGlobalErrorNotification: (
          error.response &&
          error.response.status === 400
        )
      })
    )
}*/
