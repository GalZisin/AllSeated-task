import IUser from '../types/types'
import SingletonArray from '../singleton/singleton'
import AsyncLock from 'async-lock'

export default class SingletonRunner {
    public array: IUser[] = [];
    constructor() { }

    private lock: AsyncLock = new AsyncLock();
    public async userOperation(user: IUser, distance: number, maxUsers: number): Promise<Response | void> {
        const singletonArray = SingletonArray.getInstance();
        let allUsersarray = [];
 
        console.log("Execute operation1");

        const done = await this.aquireLock("key1");
        console.log(`key1 lock enter`)

        allUsersarray = singletonArray.getArray();
        console.log("array before: " + JSON.stringify(allUsersarray))

        singletonArray.setArray(user);

        allUsersarray = singletonArray.getArray();
        console.log("array after: " + JSON.stringify(allUsersarray))

        this.array = singletonArray.getByDistance(user, distance, maxUsers)

        console.log("array after getByDistance: " + JSON.stringify(this.array))
        // await this.init();
        console.log("lock2 Done")
        done();
    }


    private async aquireLock(key: string): Promise<() => void> {
        return new Promise((resolve, reject) => {
            this.lock.acquire(key, done => {
                resolve(done);
            }, (err) => { // in case our aquire fails(times out, etc.)
                if (err) {
                    reject(err);
                }
            })
        })
    }


    // private async init(): Promise<void> {
    //     console.log(1);
    //     await this.sleep(60000);
    //     console.log(2);
    // }

    // sleep = (ms: number) => {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // }
}