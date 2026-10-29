#include <SFML/Graphics.hpp>
#include <vector>
using namespace std;
using namespace sf;
bool canChangeDirection(Vector2i Nowdirection,Vector2i Newdirection)//判断是否可以转
{
    if(Newdirection.x == -Nowdirection.x&&
       Newdirection.y == -Nowdirection.y)
       {
           return false;
       }
       return true;
}
int main(){
RenderWindow window(//设置游戏窗口
    VideoMode({800,600}),
    "Snake Game"
);
vector<Vector2i>snakePosition = {{20,15},{19,15},{18,15}};//蛇的位置
Vector2i direction = {1,0};//方向变量
Vector2i Newdirection = {0,0};//变动的方向向量
while (window.isOpen())//设置Game Loop
 {
   while(const optional event = window.pollEvent())//处理所有待处理事件
   { 
           if(event->is<Event::Closed>())//如果用户关闭窗口
           {
            window.close();
           }
           if(const auto* keyEvent = event->getIf<Event::KeyPressed>())//键盘控制方向
           {
              bool isDirectionKey = true;
              if(keyEvent->code == Keyboard::Key::Up)//方向向上
              {
                Newdirection = {0,-1};
              }
              else if(keyEvent->code == Keyboard::Key::Down)//方向向下
              {
                Newdirection = {0,1};
              }
              else if(keyEvent->code == Keyboard::Key::Left)//方向向左
              {
                Newdirection = {-1,0};
              }
              else if(keyEvent->code == Keyboard::Key::Right)//方向向右
              {
                Newdirection = {1,0};
              }
              else
              {
                   isDirectionKey = false;
              }
              if(isDirectionKey==true&&canChangeDirection(direction,Newdirection)==true)
              {
                direction = Newdirection;
              }
           }
   }

        //清屏，以显示下一次内容
        window.clear(Color::Black);
        //设置棋盘
       RectangleShape wallcell(Vector2f(18.f,18.f));//背景创造格子
       wallcell.setFillColor(Color::Green);
       for(int col=0;col<40;col++)//防止格子
       {
          for(int row=0;row<30;row++)
          {
            
            wallcell.setPosition(Vector2f(col*20.f,row*20.f));
            window.draw(wallcell);
          }
       }
       RectangleShape snakeCell(Vector2f(18.f,18.f));
       snakeCell.setFillColor(Color::Blue); // 蛇身格子
       
       int snakeSize = snakePosition.size();
       for(int i = 0;i<snakeSize;i++)
       {
        snakeCell.setPosition(Vector2f(snakePosition[i].x*20.f,snakePosition[i].y*20.f));
        window.draw(snakeCell);
       }
       Vector2i moveDirection = {1,0};
       RectangleShape foodCell(Vector2f(18.f,18.f));
       foodCell.setFillColor(Color::Red);  // 食物格子
       foodCell.setPosition(Vector2f(20*20.f,18*20.f));
       window.draw(foodCell);
        //显示当前画面
        window.display();
 }
 return 0;
}