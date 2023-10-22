import React, { useRef, useEffect } from "react";
import TableRow from "../TableRow";
import createRandomUserWithErrors from "../../services/randomDataService";

const TableFaker = ({ fakerUsers, country, onSetFakerUsers, seed, sliderValue, seedWithPages, onSetSeedWithPages }) => {
  const containerRef = useRef(null);

  const loadMoreUsers = () => {
    const moreUsers = createRandomUserWithErrors(seedWithPages, country, sliderValue, 10);
    onSetFakerUsers((prev) => [...prev, ...moreUsers]);
    onSetSeedWithPages((prevSeed) => prevSeed + 10);
  };

  useEffect(() => {
    onSetSeedWithPages((prevSeed) => prevSeed + 20);
    const result = createRandomUserWithErrors(seed, country, sliderValue, 20);
    onSetFakerUsers(result);
  }, [seed, country, sliderValue]);
  
  useEffect(() => {
    const handleScroll = (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
            if (scrollTop + clientHeight >= scrollHeight) {
        loadMoreUsers();
      }
    };
    containerRef.current.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreUsers]);


  const headers = ["#", "ID", "Name", "Address", "Phone number"];

  return (
    <div className="m-5" ref={containerRef} style={{ overflowY: "auto", height: "calc(100vh - 100px)" }}>
      <table className="table table-bordered">
        <thead>
          <tr>
            {headers.map((title, index) => (
              <th key={index} scope="col">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fakerUsers.map((row, index) => (
            <TableRow key={index} data={row} counter={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableFaker;
