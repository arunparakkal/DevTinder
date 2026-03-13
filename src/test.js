 const field = ["firstName", "lastName", "password", "age", "gender", "skill", "photoUrl", "userId"];
         
        const UserData = [ 'gender' ]
      UserData.every((e) => {
         console.log(  field.includes(e));
      })
             
     