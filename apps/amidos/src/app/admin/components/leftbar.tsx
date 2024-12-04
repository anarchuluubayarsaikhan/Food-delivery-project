'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
function logout() {
  localStorage.removeItem('accesstoken');
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000);
}
export default function LeftBar() {
  return (
    <div>
      <Component1 />
    </div>
  );
}
function Component1() {
  return (
    // <div className="  bg-gradient-to-r from-pink-100 to-white mr-6">
    <Sidebar className="p-0">
      <div className="dropdown rounded-lg bg-gradient-to-r from-pink-100 to-white  w-[400px] h-[800px]">
        <div className="text-3xl  text-center text-bold italic text-[#52071B] ">AMIDO'S</div>
        <Sidebar.Items className="m-4 text-md">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin" className="text-black text-2xl italic hover:text-[#52071B]" icon={HiChartPie}>
              Хяналтын самбар
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Amido's" className="text-black text-2xl italic hover:text-[#52071B]">
              <Sidebar.Item href="/admin/addProduct" className="text-xl italic hover:text-[#52071B]">
                Бүтээгдэхүүн
              </Sidebar.Item>
              <Sidebar.Item href="/admin/successfullorder" className="text-xl italic hover:text-[#52071B]">
                Хүргэлтийн захиалга
              </Sidebar.Item>
              <Sidebar.Item href="/admin/tablesOrder" className="text-xl italic hover:text-[#52071B]">
                Ширээ захиалга
              </Sidebar.Item>
              <Sidebar.Item href="#" className="text-xl italic hover:text-[#52071B]">
                Буцаалт
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="#" className="text-2xl italic hover:text-[#52071B]" icon={HiUser}>
              Админ
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable} className="text-2xl italic hover:text-[#52071B]">
              <button onClick={() => logout()}>Гарах</button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </div>
    </Sidebar>
    // </div>
  );
}
//href="/admin/orders"
//href="/admin/food"

//
//className="w-[300px] h-[900px] bg-white mt-10 pt-6 flex flex-col gap-4 text-[#121316] p-10 relative rounded-lg"
//className="text-2xl mb-4"
