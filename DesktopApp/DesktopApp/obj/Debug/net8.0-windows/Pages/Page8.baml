   M S B A M L   `   `   `  ����  
DesktopApp    DesktopApp.Pages.Page8   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5        N� Title$  Activity Planner��5      .��5
      � 
������� � ColumnDefinitions 5   
   �� 5      $	��300 �6   �� 5      $��* �6   .+�5   
   �� ���#F8F9FA���#E0E0E0$��0,0,1,0q�5       �� CornerRadius$ 	0,12,12,0��5      ._�5      � $��25q�6    � RowDefinitions 5      �� 5      $
��Auto �6$   �� 5      $��* �6$   �� 5      $
��Auto �6$   �� 5      $
��Auto �6$   .+�5      �� $ 12��6    �� Padding$ 20q�5      ���#F0F4FF$��0,0,0,30q�5!      ._�5"      �  5#      �� 5$      $
��Auto �6/   �� 5%      $��* �6/   .+�5)      � $��38��6   $��38��6+   .+�5*      (� .��5+   "   F� ����ЀJ]�����hx@���@x}@��р�� ����@x}���hx�рJ]���Ѐ��@��׀���;G�@KL @KL ׀��@���@KL @KL Ѐ,@��׀,�;G�@KL @KL ׀,@���@KL @KL 	���#1a73e85,   '   5-      5.      �� 51      $��1��6%   $��15,0,0,0q�52   %   $��Center=�53   %   .+�54      �� $��Travel Planner��6(   $��18(�55   (   $��SemiBold"�56   (   ���#1a73e857   (   �� 58      $��Plan your next adventure��6(   $��12(�59   (   ���#666666$��0,4,0,0q�5;   (   5<      5=      5>      �� 5A      $��1��6   $	��Top=�5B      
�������$ 12��5D      $ 20q�5E      $��1q�5F      ���#E0E0E0._�5H      �� .+�5I      �� $��Activity Planning��6$   $��18(�5J   $   $��SemiBold"�5K   $   $��0,0,0,15q�5L   $   ���#1a73e85M   $   �� 5O      $/��)Plan activities for each day of your trip��6$   $
��Wrap=�5P   $   $��14(�5Q   $   ���#666666$��0,0,0,20q�5S   $   �� 5U      $��Tips:��6$   $��SemiBold"�5V   $   $��14(�5W   $   $��0,0,0,5q�5X   $   �� 5Z      $%��• Add activities for each day��6$   $
��Wrap=�5[   $   $��13(�5\   $   ���#666666$��0,0,0,5q�5^   $   �� 5`      $+��%• Include time slots for activities��6$   $
��Wrap=�5a   $   $��13(�5b   $   ���#666666$��0,0,0,5q�5d   $   �� 5f      $&�� • Don't overpack your schedule��6$   $
��Wrap=�5g   $   $��13(�5h   $   ���#666666$��0,0,0,5q�5j   $   5k      5l      �� 5o      -   5         ��Name$ 
BackButton��5p   	   $��2��5o      $��← Back��5q   	   $��Stretch=�5s   	   $��46��5t   	   $��14(�5u   	   $��SemiBold"�5v   	   
����������#1a73e8$��1q�5y   	   ���#1a73e8 � Cursor$
 Hand��5{   	   $��0,0,0,15q�5|   	    � 	Resources 5}       �� 
TargetType	 �� Property
 �� Value��%_   '��       �� 5~      " ��6    .�5      �� 	 �@��CornerRadius$
 23��6=   5�      5�      5�      �� 5�      -   5        $ SaveActivitiesButton��5�      $��3��5�      $��Save Activities��5�      $��Stretch=�5�      $��46��5�      $��14(�5�      $��SemiBold"�5�      ���#1a73e8
�������$��0q�5�      $
 Hand��5�       5�      ��%_   '��       �� 5�      " ��6    .�5�      �� 	 �@��CornerRadius$
 23��6=   5�      5�      5�      5�      5�      � 5�   
   $��1��6    5�      �� 5�      $
��Auto �6    �� 5�      $��* �6    .+�5�      �� 
�������$ 30,30,30,15q�6(   ._�5�      �� $!��Day-wise Activities Planner��6   $��24(�5�      $��SemiBold"�5�      ���#1a73e85�      5�      �� 5�      $��1��6   
�������$��
30,0,30,30q�5�      $ 12��5�      ���#E0E0E0$��1q�5�      ._�5�      �� -   5         ��Name$ DayTabs��5�      $��0q�5�      
������ $��10q�5�       5�       �� 
TargetType ��Name ��Name �� Triggers P� Property P� Value �� 
TargetName   AddActivityButtonStyle  ActivityCardStyle �� Triggers��%�  '��       &	  �    &	 $    �� 5�      " ��6    .�5�      �� 	 � ��
 5�   "   �� 5�   &   " ��66   .R�5�   *   �� $ Border��61   $��0,0,0,2q�5�   1   
������ $ 15,10q�5�   1   $��0,0,5,0q�5�   1   ._�5�   .   �� $ ContentSite��6?   $��Header��5�   ?   $��Center=�5�   ?   $��Center=�5�   ?   5�   +    5�   *   P� 5�   .    �@��
IsSelected$
 True��6L   . �5�   2   �� $ Border��69   	 � ��
 �#1a73e86d   �� 5�   2   	 � ��
 �#1a73e86O   5�   /   P� 5�   .    �@��
IsSelected$ False��6L   . �5�   2   �� 	 � ��
 �#6666666O   5�   /   P� 5�   .    �@J�IsMouseOver$
 True��6M   . �5�   2   �� $ Border��69   	 � ��
 �#F0F4FF6c   5�   /   5�   '   5�      5�      �� 5�      " ��6?   .�5�      �� 	 � ��
 �#1a73e86;   �� 5�      	 � ��

 �����6;   �� 5�      	 � ��$

 15,8q�68   �� 5�      	 � ��$
 0q�6@   �� 5�      	 �@�Cursor$

 Hand��67   �� 5�      	 � ��
 5�   "   �� 5�   &   " ��66   .R�5�   *   �� #��z��61   #��z��5�   1   #��z��5�   1   $ 20��5�   1   ._�5�   .   �� $��Center=�6?   $��Center=�5�   ?   5�   +    5�   *   P� 5�   .    �@J�IsMouseOver$
 True��6M   . �5�   2   �� 	 � ��
 �#1565C06O   5�   /   5�   '   5�      5�      �� 5�      " ��6:   .�5�      �� 	 � ��

 �����6;   �� 5�      	 � ��
 �#E0E0E06<   �� 5�      	 � ��$
 1q�6@   �� 5�      	 �@��CornerRadius$
 10��6=   �� 5�      	 �@��Padding$
 15q�68   �� 5�      	 � ��$	
 0,8q�67    5�      P� 5�   "    �@J�IsMouseOver$
 True��6A   . �5�   &   �� 	 � ��
 �#F8F9FA6C   5�   #   5     5     5     5     5     5     5     