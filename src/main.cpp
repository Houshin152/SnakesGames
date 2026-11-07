#include <SFML/Graphics.hpp>
#include <vector>
#include <random>
#include <iostream>
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
vector<Vector2i>snakePosition = {{20,15},{19,15},{18,15}};//初始化蛇的位置
int score = 0;//初始化分数

random_device rdplace;//调用随机数
mt19937 gen(rdplace());
uniform_int_distribution<int> randomX(1,38);
uniform_int_distribution<int> randomY(1,28);
Vector2i foodPosition = {randomX(gen),randomY(gen)};
Vector2i direction = {1,0};//方向变量
Vector2i Newdirection = {0,0};//变动的方向向量
Clock moveclock;//设置计时器
//生成食物
auto generateFood = [&]()
{
  if (snakePosition.size() >= 1200)//蛇已经占满格子
{
  return false;
}
  bool isOnSnake = true;
  while(isOnSnake)
  {
    isOnSnake = false;
    foodPosition = {randomX(gen),randomY(gen)};
    for(int i = 0;i<snakePosition.size();i++)
    {
       if(foodPosition == snakePosition[i])
       {
        isOnSnake = true;
        break;
       }
    }
  }
  return true;
};
        bool isDead = false;
        bool gamewin = false;
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
        //蛇的自动移动
        if(isDead == false && gamewin == false && moveclock.getElapsedTime() >= milliseconds(150))
        {
          moveclock.restart();//重置计时器
          Vector2i newhead = snakePosition[0] + direction;//计算新的蛇的位置
          bool eatFood = (newhead == foodPosition);
          if(newhead.x>39||newhead.x<0||newhead.y>29||newhead.y<0)//蛇到了边界外
             {
              isDead = true;
             }
          for(auto p = snakePosition.begin();p!=snakePosition.end();p++)//蛇撞到蛇身
          {
             if(*p == newhead)
             {
              if(p != snakePosition.end()-1 || eatFood == true)
              {
                isDead = true;
              }
             }
          }
           if(isDead == true)//判断蛇是否碰撞死亡
          {
             cout << "GAME_OVER:" << score << endl;
             window.close();
          }
           else
          {
            if(eatFood == false)
           {
            snakePosition.pop_back();//删除蛇尾
           }
           snakePosition.insert(snakePosition.begin(),newhead);//新蛇头插入头部
           if(eatFood == true)
           {
              score = score + 10;
           }
            if(eatFood == true&&generateFood() == false)//蛇身占满棋盘，游戏胜利
           {
              gamewin = true;
           }
          }
          if(gamewin == true)//判断游戏是否胜利
          {
            //游戏结束
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
       RectangleShape foodCell(Vector2f(18.f,18.f));
       foodCell.setFillColor(Color::Red);  // 食物格子
       foodCell.setPosition(Vector2f(foodPosition.x*20.f,foodPosition.y*20.f));
       window.draw(foodCell);
        //显示当前画面
        window.display();
 }
 return 0;
}