
import csv

class Node:
        """A simple example class"""
        def __init__(self, num):
                self.id = num
                self.runs = []
                self.avg = 0
                self.pair = ""
                self.part = ""
                self.high = 0
                self.low = 0
                self.range = 0
                self.eventsel = ""
                self.umask = ""
                self.dif = 0
        def computeAvg(self):
                sums = 0
                num = 0
                for r in self.runs:
                       num = num + 1
                       sums = sums + r
                if(num == 0):
                        self.avg = 0
                        return 0
                self.avg = sums/num
                return (sums/num)

        def computeMin(self):
                lo = 10000000
                for r in self.runs:
                       if( lo > r):
                               lo = r
                self.low = lo
                return (lo)

        def computeMax(self):
                hi = 0
                for r in self.runs:
                       if( hi < r):
                               hi = r
                self.high = hi
                return (hi)

        def computeRange(self):
                self.range = self.high-self.low
                return self.range
        def getData(self):
                data = []
                data.append(self.id)
                data.append(self.eventsel)
                data.append(self.umask)
                data.append(self.pair)
                data.append(self.part)
                for r in self.runs:
                        data.append(r)
                data.append(self.avg)
                data.append(self.high)
                data.append(self.low)
                data.append(self.range)
                data.append(self.diff)
                return data
        
        def __str__(self):
                return self.eventsel + " " + self.umask + " " + str(self.runs) + " " + self.pair + " " + self.part
        
def main():
        f = open("DATA_2READERS1.txt")
        lines = f.readlines()
        pr = False
        ctr = 0
        umask = ""
        event = ""
        currentNode = Node(1)
        node_list = []
        part = "Reader 2"
        pair = "2 readers"
        first = True
        counter = 1
        for line in lines:
                #if(pr == True or ctr > 0):
                #        print(line)
                #        pr = False
                #        if(ctr > 1):
                #                ctr = -1
                #        ctr = ctr + 1
                if("###### warmup done ######" in line):
                        print(line)
                        pr = True
                if(pr == True and "p0" in line):
                        line = line.split("p0x")
                        line = line[1].split("_0x")
                        temp = []
                        temp.append(line[0])
                        line = line[1].split(" ")
                        temp.append(line[0])
                        temp.append(line[1])
                        if(umask != line[0]):
                                #print(umask + " " +line[0])
                                if(first == False):
                                        currentNode.computeAvg()
                                        currentNode.computeMax()
                                        currentNode.computeMin()
                                        currentNode.computeRange()
                                        node_list.append(currentNode)
                                else:
                                        first = False
                                umask = temp[1]
                                event = temp[0]
                                currentNode = Node(counter)
                                counter = counter + 1
                                currentNode.umask = umask
                                currentNode.eventsel = event
                                currentNode.pair = pair
                                currentNode.part = part
                        currentNode.runs.append(int(temp[2]))
                #if("1" in event):
                #        for node in node_list:
                #                print(node)
                #        exit()
                if("reader 2 done" in line):
                        print("reader 2")
                        part = "2 readers"
                        pair = "Reader 1"
                if("END" in line):
                        currentNode.computeAvg()
                        currentNode.computeMax()
                        currentNode.computeMin()
                        currentNode.computeRange()
                        node_list.append(currentNode)
                        break;
        f.close()
        for node in node_list:
                if(node.id < 65537):
                        if(node_list[node.id + 65535].avg == 0 and node.avg == 0):
                                node.diff = 0
                        elif(node_list[node.id + 65535].avg == 0 and node.avg != 0):
                                node.diff = 1000
                        else:
                                node.diff = node.avg / node_list[node.id + 65535].avg * 100
                else:
                        if(node.avg == 0 and node_list[node.id - 65537].avg == 0):
                                node.diff = 0
                        elif(node.avg == 0 and node_list[node.id - 65537].avg != 0):
                                node.diff = 1000
                        else:   
                                node.diff = node_list[node.id - 65537].avg / node.avg * 100
        header = ['ID', 'Event Sel', 'umask', 'Pair', 'Part', 'Run 1', 'Run 2', 'Run 3', 'Run 4', 'Run 5', 'Run 6', 'Run 7', 'Run 8', 'Run 9', 'Run 10', 'Average', 'Max', 'Min', 'Range', 'Diff']
        with open("data.csv", "w", encoding="UTF8", newline='') as data:
                writer = csv.writer(data)
                writer.writerow(header)
                for node in node_list:
                        writer.writerow(node.getData())
                
        
                
        

        
if __name__ == "__main__":
    main()
