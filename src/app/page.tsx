"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client"; //import the auth client
 
import { useState } from "react";


export default function Home() {

  const { data: session } = authClient.useSession() 


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: () => {
        window.alert('somethin wrong here')
      },
      onSuccess: () => {
        window.alert('success great')
      }
    })
  }


  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: () => {
        window.alert('somethin wrong here')
      },
      onSuccess: () => {
        window.alert('success great')
      }
    })
  }

  if (session) {
    return (
      <div
      className="flex flex-col p-4 gap-y-4"
      >
        <p>
          loged in an {session.user.name}
        </p>

        <Button onClick={() => authClient.signOut()}>
          sign out
        </Button>
      </div>
    )
  }

   return (
   <div className="flex flex-col gap-y-10"> 
     <div className="p-4 flex flex-col gap-y-4">
      <Input 
      placeholder="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <Input
      placeholder="email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      />

      <Button
      onClick={onSubmit}
      >
        created user
      </Button>
     </div>

     <div className="p-4 flex flex-col gap-y-4">
      <Input
      placeholder="email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <Input
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      />

      <Button
      onClick={onLogin}
      >
        login
      </Button>
     </div>
    </div>
   )
}
