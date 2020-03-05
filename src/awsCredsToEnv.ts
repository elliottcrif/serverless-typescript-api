import { exec } from 'child_process'

type Account = { 
    [index: string]: string,
    name: string, 
    aws_access_key_id: string, 
    aws_secret_access_key: string, 
    region: string
}

type AccountsDictionary = { 
    [index: string]: Account
}

exec('cat ~/.aws/credentials', (error, stdout, stderr) => {
    if (error) throw error
    if (stdout) {
        let accounts = parseStdOut(stdout)
        let {aws_access_key_id, aws_secret_access_key, region} = accounts['terraform'] 
        let command = `export AWS_ACCESS_KEY_ID=${aws_access_key_id} AWS_SECRET_ACCESS_KEY=${aws_secret_access_key} AWS_DEFAULT_REGION=${region}`
        console.log(command)
    }
    if (stderr) console.log(stderr)
})

function parseStdOut(stdout: string): AccountsDictionary {
    const reducer = (prev: AccountsDictionary, current: string, currentIndex: number) => {
        if (current.includes('[')) prev[current.substring(1, current.length - 1)] = <Account>{}
        else prev[Object.keys(prev).pop()!][current.split('=')[0]] = current.split('=')[1]
        return prev
    }
    return stdout.split('\n').reduce(reducer, <AccountsDictionary>{})
}

