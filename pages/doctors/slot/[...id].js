import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function AddSlotPage() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  // console.log(id)
  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   axios.get('/api/doctor/single?id='+id).then(response => {
  //     console.log(response)
  //     setProductInfo(response.data);
  //   });
  // }, [id]);

const addSlot = async (ev) => {
    ev.preventDefault();
    const data = {
        startTime,
        endTime,
        docId: id
    }
    console.log(data)
    // return;
    await axios.post('/api/slots', data)
    .then(res => {
        if(res.status === 200){
            router.push('/doctors')
        }
    })

}
  return (
    <Layout>
      <h1>Add Doctor Slot</h1>
      <form onSubmit={addSlot}>
      <label>Start Time</label>
        <input
          type="text"
          placeholder="Start Time"
        //   value={sta}
          onChange={ev => setStartTime(ev.target.value)}/>
        <label>End Time</label>
        <input
          type="text"
          placeholder="End Time"
        //   value={specialization}
          onChange={ev => setEndTime(ev.target.value)}/>
          <button
          type="submit"
          className="btn-primary">
          Save
        </button>
          </form>
    </Layout>
  );
}