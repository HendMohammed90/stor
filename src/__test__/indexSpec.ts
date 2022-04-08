import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe('Test the basic endpoint' , ()=>{
    it('Get The main End Point /' , async()=>{
        const response = await request.get('/');
        // console.log(response);
        expect(response.status).toBe(200);
    })
})