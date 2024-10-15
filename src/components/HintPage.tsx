import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from "./ui/card"
import { Navbar } from './Navbar';

const URL = "http://localhost:3000"

export const HintPage = () => {
  // State to track hint visibility
  const [hintsVisible, setHintsVisible] = useState([false, false, false, false, false, false]);
    const [solved, setSolved] = useState([false, false, false, false, false, false]);
    const [value, setValue] = useState("")

  // Toggle the visibility of a hint based on its index
  const toggleHint = (index: number) => {
    const newHintsVisible = [...hintsVisible];
    newHintsVisible[index] = !newHintsVisible[index];
    setHintsVisible(newHintsVisible);
  };

  const handleClick = async () => {
        let res = await fetch(URL + "/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                flag: value
            })
        })

        if (res.status == 200) {
            let data = await res.json();

            let old = [...solved];
            old[data.index] = true;
            setSolved([...old]);
        } else {
            alert("Wrong flag");
        }
        setValue("")
    }

  return (
    <div className="flex w-screen flex-col items-center">
      <Navbar />
      <h1 className="mb-4 mt-8 text-xl font-bold">Submit your Flag</h1>
      <p className="mb-4">When you find a flag write it down somewhere and submit it.</p>
      <div className="items-between mb-6 flex justify-between">
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type your submission here..." className="max-w-80 mr-4"/>
          <Button onClick={handleClick} className="">
            Submit Flag
          </Button>
      </div>

      {/* Hints Section */}
      <div className="space-y-4">
        {/* Hint 1 */}
        <div>
          <p className={solved[0] ? "text-lime-400" : ""}>Web 1</p>
          <Button className={solved[0] ? "bg-lime-400" : ""} onClick={() => toggleHint(0)}>Show Hint</Button>
          {hintsVisible[0] && (
            <Card className="mt-2">
              <CardContent>There might be a blog post you are missing.</CardContent>
            </Card>
          )}
        </div>

        {/* Hint 2 */}
        <div>
          <p className={solved[1] ? "text-lime-400" : ""}>Web 2</p>
          <Button className={solved[1] ? "bg-lime-400" : ""} onClick={() => toggleHint(1)}>Show Hint</Button>
          {hintsVisible[1] && (
            <Card className="mt-2">
              <CardContent>Perhaps there is more to download that just the app.</CardContent>
            </Card>
          )}
        </div>

        {/* Hint 3 */}
        <div>
          <p className={solved[2] ? "text-lime-400" : ""}>Web 3</p>
          <Button className={solved[2] ? "bg-lime-400" : ""} onClick={() => toggleHint(2)}>Show Hint</Button>
          {hintsVisible[2] && (
            <Card className="mt-2">
              <CardContent>There be dragons in auth sql code.</CardContent>
            </Card>
          )}
        </div>

        {/* Hint 4 */}
        <div>
          <p className={solved[3] ? "text-lime-400" : ""}>Rev 1</p>
          <Button className={solved[3] ? "bg-lime-400" : ""} onClick={() => toggleHint(3)}>Show Hint</Button>
          {hintsVisible[3] && (
            <Card className="mt-2">
              <CardContent>Sometimes people leave passwords in the code.</CardContent>
            </Card>
          )}
        </div>

        {/* Hint 5 */}
        <div>
          <p className={solved[4] ? "text-lime-400" : ""}>Rev 2</p>
          <Button className={solved[4] ? "bg-lime-400" : ""} onClick={() => toggleHint(4)}>Show Hint</Button>
          {hintsVisible[4] && (
            <Card className="mt-2">
              <CardContent>Use a program like Ghidra to uncover the algorithm behind the premium licence.</CardContent>
            </Card>
          )}
        </div>

        {/* Hint 6 */}
        <div>
          <p className={solved[5] ? "text-lime-400" : ""}>Pwn 1</p>
          <Button className={solved[5] ? "bg-lime-400" : ""} onClick={() => toggleHint(5)}>Show Hint</Button>
          {hintsVisible[5] && (
            <Card className="mt-2">
              <CardContent>There is a buffer overflow in one of the licence checks. This one is harded than the rest.</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

