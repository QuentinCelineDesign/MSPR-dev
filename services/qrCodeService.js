export default function getCoupon(code) {
    console.log('service : ' + code)
    return(
        fetch(`http://192.168.1.46:8000/coupon/${code}`,
            ).then((response) => {
                if(response.status === 200){
                console.log("STATUS 200 SUCCESS")
                return response.text();
            }else{
                console.log("REQUEST ERROR")
                return(
                    response.statusText
                )
            }
        })
    )
}
