'use client';
import Footer from '@/app/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface FormValues {
  phoneNumber: string;
  homeAddress: string;
}
type Foodlocal = {
  id: string;
  photos: string;
  name: string;
  price: number;
  quantity: number;
};
const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '/' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'САГС', link: '/order' },
];
const otp = Math.floor(Math.random() * 899999) + 100000;
const id = nanoid();
export default function BuyStepone() {
  const [orderedItem, setOrderedItem] = useState<Foodlocal[] | null>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [total, setTotal] = useState(0);

  console.log(orderedItem);

  useEffect(() => {
    const order = localStorage.getItem('order');

    if (order) {
      try {
        const orders: Foodlocal[] = JSON.parse(order);
        const total = Array.from(orders).reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
        setTotal(total);
        setOrderedItem(orders);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing order from localStorage:', error);
        setOrderedItem([]);
      }
    } else {
      setOrderedItem([]);
    }
  }, []);
  function successfullorder(values: FormValues) {
    fetch(`/api/admin/successfullorder`, {
      method: 'POST',
      body: JSON.stringify({
        address: values.homeAddress,
        phonenumber: values.phoneNumber,
        order: orderedItem,
        totalprice: total,
        otp: otp,
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem('successotp', JSON.stringify(otp));
        toast.success('Захиалга амжилттай батлалгаажлаа');
        router.push(`/successfullorder/${id}`);
      } else {
        toast.success('Захиалга баталгаажихад алдаа гарлаа');
      }
    });
  }

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required('Утсаа оруулна уу'),
    homeAddress: Yup.string().required('Хаягаа оруулна уу'),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      homeAddress: '',
    },
    onSubmit: async (values) => {
      await successfullorder(values);
    },
    validationSchema,
  });

  // function onSubmit() {
  //   successfullorder();
  // fetch('').then((res) => {
  //   if (res.ok) {
  //     successfullorder();
  //     toast.success('Төлбөр амжилттай төлөгдлөө');
  //   } else {
  //     toast.error('Төлбөр төлөхөд алдаа гарлаа');
  //   }
  // });
  // }
  console.log(formik.values);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 border-8 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="flex bg-black gap-4 justify-center p-6 w-full">
            {navs.map((nav) => (
              <Link className="text-white" key={nav.name} href={nav.link}>
                {nav.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-center  items-center gap-6 mt-10">
            <div className="flex gap-5">
              <div className="max-w-[333px] py-6 px-6 flex flex-col gap-4 rounded-2xl mb-[230px]">
                <div className="flex gap-2 items-center">
                  <span className="text-xl font-bold text-[#8B0000]">ТАНЫ ЗАХИАЛГА</span>
                  <span className="text-gray-400"></span>
                </div>
                <div className="flex flex-col gap-4 border-dashed border-b-2 py-6">
                  {orderedItem?.map((order) => (
                    <div className="flex gap-6">
                      <img className="w-[100px] h-[100px] rounded-lg" src={order.photos}></img>
                      <div className="flex flex-col gap-1 pb-1">
                        <span className="text-sm font-normal text-[#52071B]">{order.name}</span>
                        <div className="text-sm font-normal text-[#342216]">
                          {order.quantity}*{order.price}
                        </div>
                        <div className="text-base font-bold text-[#52071B]">{order.quantity * order.price},000₮</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pb-8 gap-1">
                  <span className="text-2xl font-normal text-[#52071B] ">Нийт төлөх дүн:{}</span>
                  <span className="text-2xl font-bold text-[#52071B]">{total},000₮</span>
                </div>
              </div>
              <div className="max-w-[687px] rounded-2xl flex flex-col">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="flex flex-col gap-6 p-8">
                      <div className="text-lg font-semibold text-[#8B0000]">Хүргэлтийн мэдээлэл оруулах</div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-[#52071B]">Утасны дугаар:</Label>
                        <Input className="rounded-full border-2 " id="phoneNumber" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span className="text-red-500 text-sm text-start">Холбогдох дугаараа оруулна уу</span> : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-[#52071B]">Хаяг:</Label>
                        <Textarea className="rounded-[18px] h-24 border-2" id="homeAddress" name="homeAddress" value={formik.values.homeAddress} onChange={formik.handleChange} />
                        {formik.touched.homeAddress && formik.errors.homeAddress ? <span className="text-red-500 text-sm text-start">Хаягаа оруулна уу</span> : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between p-8">
                    <Link href="/lunch">
                      <Button className="border-solid border-2 bg-white rounded-2xl px-9 py-2" variant="amidos2" type="button">
                        Буцах
                      </Button>
                    </Link>
                    {/* <Link href="/buysteptwo"> */}
                    <Button className="rounded-2xl px-9 py-2" variant="amidos" type="submit">
                      Төлбөр төлөх
                    </Button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
