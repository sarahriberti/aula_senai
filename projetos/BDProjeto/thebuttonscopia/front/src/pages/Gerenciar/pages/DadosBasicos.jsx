import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../GerenciarConta/Gerenciar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function DadosBasicos() {
    return (
        <div className="dados-main">
            <Form>
                <div className='alt-name'> {/* >>> ALTERAR NOME <<< */}
                    <Form.Label>Nome:</Form.Label>
                    <div>
                        <Form.Control className='space-name'
                            type="text"
                            autoFocus
                        />
                    </div>
                </div>
                <div className='alt-date-born'> {/* >>> ALTERAR DATA DE NASCIMENTO <<< */}
                    <Form.Label>Data de nascimento:</Form.Label>
                    <div className='alt-date-box'>
                        <div className='alt-day'>
                            <Form.Select className='space-day' aria-label="Default select example"> {/* >>> OPÇÕES DE DIA <<< */}
                                <option>Dia</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </Form.Select>
                        </div>
                        <div className='alt-month'>
                            <Form.Select className='space-month' aria-label="Default select example"> {/* >>> OPÇÕES DE MÊS <<< */}
                                <option>Mês</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </Form.Select>
                        </div>
                        <div className='alt-year'>
                            <Form.Select className='space-year' aria-label="Default select example"> {/* >>> OPÇÕES DE ANO <<< */}
                                <option>Ano</option>
                                <option value="1">1933</option>
                                <option value="2">1934</option>
                                <option value="3">1935</option>
                                <option value="4">1936</option>
                                <option value="5">1937</option>
                                <option value="6">1938</option>
                                <option value="7">1939</option>
                                <option value="8">1940</option>
                                <option value="9">1941</option>
                                <option value="10">1942</option>
                                <option value="11">1943</option>
                                <option value="12">1944</option>
                                <option value="13">1945</option>
                                <option value="14">1946</option>
                                <option value="15">1947</option>
                                <option value="16">1948</option>
                                <option value="17">1949</option>
                                <option value="18">1950</option>
                                <option value="19">1951</option>
                                <option value="20">1952</option>
                                <option value="21">1953</option>
                                <option value="22">1954</option>
                                <option value="23">1955</option>
                                <option value="24">1956</option>
                                <option value="25">1957</option>
                                <option value="26">1958</option>
                                <option value="27">1959</option>
                                <option value="28">1960</option>
                                <option value="29">1961</option>
                                <option value="30">1962</option>
                                <option value="31">1963</option>
                                <option value="32">1964</option>
                                <option value="33">1965</option>
                                <option value="34">1966</option>
                                <option value="35">1967</option>
                                <option value="36">1968</option>
                                <option value="37">1969</option>
                                <option value="38">1970</option>
                                <option value="39">1971</option>
                                <option value="40">1972</option>
                                <option value="41">1973</option>
                                <option value="42">1974</option>
                                <option value="43">1975</option>
                                <option value="44">1976</option>
                                <option value="45">1977</option>
                                <option value="46">1978</option>
                                <option value="47">1979</option>
                                <option value="48">1980</option>
                                <option value="49">1981</option>
                                <option value="50">1982</option>
                                <option value="51">1983</option>
                                <option value="52">1984</option>
                                <option value="53">1985</option>
                                <option value="54">1986</option>
                                <option value="55">1987</option>
                                <option value="56">1988</option>
                                <option value="57">1989</option>
                                <option value="58">1990</option>
                                <option value="59">1991</option>
                                <option value="60">1992</option>
                                <option value="61">1993</option>
                                <option value="62">1994</option>
                                <option value="63">1995</option>
                                <option value="64">1996</option>
                                <option value="65">1997</option>
                                <option value="66">1998</option>
                                <option value="67">1999</option>
                                <option value="68">2000</option>
                                <option value="69">2001</option>
                                <option value="70">2002</option>
                                <option value="71">2003</option>
                                <option value="72">2004</option>
                                <option value="73">2005</option>
                                <option value="74">2006</option>
                                <option value="75">2007</option>
                                <option value="76">2008</option>
                                <option value="77">2009</option>
                                <option value="78">2010</option>
                                <option value="79">2011</option>
                                <option value="80">2012</option>
                                <option value="81">2013</option>
                                <option value="82">2014</option>
                                <option value="83">2015</option>
                                <option value="84">2016</option>
                                <option value="85">2017</option>
                                <option value="86">2018</option>
                                <option value="87">2019</option>
                                <option value="88">2020</option>
                                <option value="89">2021</option>
                                <option value="90">2022</option>
                                <option value="91">2023</option>
                            </Form.Select>
                        </div>
                    </div>

                </div>
                <Button as="input" type="submit" value="Salvar" />{' '}
                <Button as="input" type="reset" value="Cancelar" />
            </Form>

        </div>
    )
}
export default DadosBasicos;